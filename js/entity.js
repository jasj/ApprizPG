/*
	
*/
function reloadEntities(){
	
			$.post('http://'+IP+':8089/appriz/getCustomerEntities',{"idSecretClient": idScretClient},function(data){
				
					console.dir(data.length);
				entities = '';
				var frsTime = 0;	
				data.forEach(function(entity){
					
					if(!($.jStorage.index().indexOf(entity["entityID"]+".css") > -1  && ($.jStorage.get(entity["entityID"]+".css")==entity["vCSS"]))){
						downloadContent("css_"+entity["entityID"]+".css",S3Bucket+FormatInteger(entity["entityID"],4)+'/CSS/entity.css',entity["vCSS"]);
						frsTime = 1;
					}
					if(!($.jStorage.index().indexOf(entity["entityID"]+".png") > -1  && ($.jStorage.get(entity["entityID"]+".png")==entity["vImg"]))){
					 downloadContent("img_"+entity["entityID"]+".png",S3Bucket+FormatInteger(entity["entityID"],4)+'/Advertising/Logos/big_logo.png',entity["vImg"]);
						frsTime = 1;
					}
				entities +='<li id="entity_'+entity["entityID"]+'" entityId="'+entity["entityID"]+'"><div class="bubble2"></div><img src="https://s3.amazonaws.com/tst_appriz_clients/'+FormatInteger(entity["entityID"],4)+'/Advertising/Logos/overWhite_logo.png?ver=1.0" alt="'+entity["entityName"]+'"/> <button class="deleteSwipe">Delete</button></li>';
					
				
				
					if( currentEntityID < 1 || isNaN(currentEntityID)){
						currentEntityID  = entity["entityID"];
						lastCSS = 2;
						frsTime = 1;
						$.jStorage.set('currentEntityID',currentEntityID) ;
					}
				});
				$("#entities ul").html(entities);
				
				
				makeSwipeEntity();
				current_inbox();
				counterByMsg();
				loadEntityTemplate(frsTime);
				
			//	alert(S3Bucket+FormatInteger(currentEntityID,4)+'/CSS/entity.css');
			//	downloadContent(FormatInteger(currentEntityID,4)+".css",S3Bucket+FormatInteger(currentEntityID,4)+'/CSS/entity.css');
				console.log(JSON.stringify(data));
				$.jStorage.set('entities', btoa($('#entities ul').html()));
			});
			
		}
		
function loadEntityTemplate(frsTime){
	oIMG = S3Bucket+FormatInteger(currentEntityID,4)+'/Advertising/Logos/big_logo.png';
	oCSS = S3Bucket+FormatInteger(currentEntityID,4)+'/CSS/entity.css';
	if(frsTime == 1) {
		$('.bankLogo img').attr("src",oIMG);
		$('.bankBrand img').attr("src",oIMG);
		$('#entityStyle').attr("href",oCSS);
	}else{
		getFileLocalURL(currentEntityID+".png", $('.bankLogo img'), "src",oIMG);
		getFileLocalURL(currentEntityID+".png", $('.bankBrand img'), "src",oIMG);
		getFileLocalURL(currentEntityID+".css", $('#entityStyle'), "href",oCSS);
	}
	
	//$('#entityStyle').attr("href",S3Bucket+FormatInteger(currentEntityID,4)+'/CSS/entity.css');
	tabSelectedColor = $("#colorHandle").css("color");//"rgb(85, 185, 73)"
}
		
function makeSwipeEntity(id){
	$( 1 ? "#entities li" : "#"+id+".Message").swipe( {
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
			$(this).find(".deleteSwipe").velocity({"right" : "0px"});
		},
		swipeRight:function(event, direction, distance, duration, fingerCount) {
			$(this).find(".deleteSwipe").velocity({"right" : -(window.innerWidth*0.8+0.72)+"px"});
		},	
		
		swipeStatus:function(event, phase, direction, distance , duration , fingerCount) {
				 if((phase === $.fn.swipe.phases.PHASE_END || phase === $.fn.swipe.phases.PHASE_CANCEL )& distance == 0)  {
						
						currentEntityID = $(this).attr("entityId");
						$.jStorage.set('currentEntityID',currentEntityID) ;
						loadEntityTemplate();
						current_inbox();
						counterByMsg();
						$('#pin').hide();
				 }
		}
	});
}

$( document ).on("tapend", "#entities .deleteSwipe",function(event){
	
	showAlert($.t("Unsuscribe Confirmation"),$.t("Are you sure that you want to unsuscribe to")+" <strong>"+$(this).parent().find('img').attr('alt')+"</strong>",function(){
		$(this).parent().remove();
	},
	function(){
	
	}
	);
});
	
	
	

