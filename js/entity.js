/*
	
*/
function reloadEntities(){
			$.post('http://'+IP+':8089/appriz/getCustomerEntities',{"idSecretClient": idScretClient},function(data){
					if(data.length == 0){
						$('#Suscri').show();
						hideIt = "#Suscri";	
						$('#menuBtn').hide();
						$(".iconBtn").show();
						$(".iconBtn").attr("logOut",1);
						$('link[typeCss="bank"]').attr('href','css/appriz.css');
						$('.header_demo img').attr('src','img/appriz-logo-horizontal.png');
					lastCSS = 1;
					}
					
				entities = '';
				var frsTime = 0;	
				data.forEach(function(entity){
					
					//if(!($.jStorage.index().indexOf(entity["entityID"]+".css") > -1  && ($.jStorage.get(entity["entityID"]+".css")==entity["vCSS"]))){
						downloadContent(entity["entityID"]+".css",S3Bucket+FormatInteger(entity["entityID"],4)+'/CSS/entity.css',entity["vCSS"]);
					//}
					//if(!($.jStorage.index().indexOf(entity["entityID"]+".png") > -1  && ($.jStorage.get(entity["entityID"]+".png")==entity["vImg"]))){
					 downloadContentIMG(entity["entityID"]+".png",S3Bucket+FormatInteger(entity["entityID"],4)+'/Advertising/Logos/big_logo.png',entity["vImg"]);
					//}
				entities +='<li id="entity_'+entity["entityID"]+'" entityId="'+entity["entityID"]+'"><div class="bubble2"></div><img src="https://s3.amazonaws.com/tst_appriz_clients/'+FormatInteger(entity["entityID"],4)+'/Advertising/Logos/overWhite_logo.png?ver=1.0" alt="'+entity["entityName"]+'"/> <button class="deleteSwipe">Delete</button></li>';
					
				
				alert(currentEntityID);
					if( currentEntityID < 1 || isNaN(currentEntityID)){
						currentEntityID  = entity["entityID"];
						lastCSS = 2;
						alert(currentEntityID);
						frsTime = 1;
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
	oIMG = S3Bucket+FormatInteger(currentEntityID,4)+'/Advertising/Logos/big_logo.png?ver=1.0';
	oCSS = S3Bucket+FormatInteger(currentEntityID,4)+'/CSS/entity.css';
	if(frsTime == 1) {
		$('.bankLogo img').attr("src",oIMG);
		$('.bankBrand img').attr("src",oIMG);
		$('#entityStyle').attr("href",oCSS);
		alert(currentEntityID);
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
	});
}

$( document ).on("tapend", "#entities ul li",function(){
	currentEntityID = $(this).attr("entityId");
	$.jStorage.set('currentEntityID',currentEntityID) ;
	loadEntityTemplate();
	current_inbox();
	counterByMsg();
});
	
	
	

