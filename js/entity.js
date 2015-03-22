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
				data.forEach(function(entity){
					
				entities +='<li id="entity_'+entity["entityID"]+'" entityId="'+entity["entityID"]+'"><div class="bubble2"></div><img src="https://s3.amazonaws.com/tst_appriz_clients/'+FormatInteger(entity["entityID"],4)+'/Advertising/Logos/big_logo.png?ver=1.0" alt="'+entity["entityName"]+'"/> <button class="deleteSwipe">Delete</button></li>';
					
					
				
					if( currentEntityID < 1 || isNaN(currentEntityID)){
						currentEntityID  = entity["entityID"];
						lastCSS = 2;
					}
				});
				$("#entities ul").html(entities);
				makeSwipeEntity();
				console.log(JSON.stringify(data));
			});
			
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
	
	
	
reloadEntities();
