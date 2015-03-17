/*
	messages.js
*/
function showMessage(id){
	$(".page-content.active").removeClass("active");
		$("#MessageDetail.page-content").addClass("active").show();
}

function makeSwipe(id){
		
			$( 1 ? ".Message" : "#"+id+".Message").swipe( {
				
				//Generic swipe handler for all directions
				swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
					oneTimeSendAjax =false;
					var mContainer = $(this).find(".moveContainer");
					var actualMargin = parseInt(mContainer.css("margin-left").replace(/[^-\d\.]/g, '') );
					
					if(direction=='left' & distance > (150) & actualMargin < 0){
							mContainer.css({"margin-left" : "-150px"}); //show delete button
							
					}else if(direction=='left' & distance < (150) & actualMargin < 0){
							mContainer.velocity({"margin-left" : "0px"}); //no show the delete button
							
					}else if(direction=='left' & distance < (window.innerWidth*0.3) & actualMargin > window.innerWidth){
							mContainer.velocity({"margin-left" : window.innerWidth+"px"});
					}else if(direction=='right' & distance > (window.innerWidth*0.3) & actualMargin > window.innerWidth*0.3){
							mContainer.velocity({"margin-left" : window.innerWidth+"px"});
						
					}else if(direction=='right'  & actualMargin >-150){
							mContainer.velocity({"margin-left" : "0px"});
						
					}
					
					else {
						mContainer.velocity({"margin-left" : "0px"});
						
				
					}
				},
				
				swipeStatus:function(event, phase, direction, distance , duration , fingerCount) {
				 if((phase === $.fn.swipe.phases.PHASE_END || phase === $.fn.swipe.phases.PHASE_CANCEL )& distance == 0)  {
						showMessage($(this).attr("MessageId"));
				 }else{
					var msg = $(this).find(".moveContainer");
					var actualMargin = parseInt(msg.css("margin-left").replace(/[^-\d\.]/g, '') );
					
					if(direction=='right'){

						if(actualMargin < 0){
							
							//msg.velocity({"margin-left" : "0px"});
						}else{
							if(distance < window.innerWidth){
								msg.css({"margin-left": distance});
							}else{
								msg.css({"margin-left": window.innerWidth});
							}
							
							
						}
					}else if(direction=='left'){
						
						if (distance< (150) & actualMargin < 1) {
							
							msg.css({"margin-left": -distance});
							
						}else{
							if(actualMargin < 1){
								msg.css({"margin-left": -150});
							}
							
						}
					}
					
				}
					
				 },
				 allowPageScroll:"vertical",
				//Default is 75px, set to 0 for demo so any distance triggers swipe
				 threshold:10 
			});
		}
		
				
		//Filter handle
		
		$( document ).on("tapend",'nav.categoryNav span',function(){
			if( $(this).css("color") == tabSelectedColor){
				$(this).css({content: "\e60b",color: tabUnSelectedColor});
				$(this).find('.path1::before').css({color: tabUnSelectedColor});
			
			}else{
				$(this).css({content: "\e60b",color: tabSelectedColor});
				$(this).find('.path1').css({color: tabSelectedColor});
			}
		});
		
		$( document ).on("taphold",'nav.categoryNav span',function(){
			$('nav.categoryNav span').css({content: "\e60b",color: tabUnSelectedColor});
			$(this).find('.path1::before').css({color: tabUnSelectedColor});
			//$(this).css({content: "\e60b",color: tabSelectedColor});
		});
		
		
	makeSwipe();
		
		
		