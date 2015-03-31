/*
	messages.js
*/


function current_inbox(){
	$('.Message').hide();
	$('.gotcolors').velocity({opacity: 1}, 200);
	$('.entity'+currentEntityID).show();
	$('nav.categoryNav li').find("span").css("color") == tabSelectedColor;	

	$(".page-content.active").removeClass("active");
	$("header.active").removeClass("active");
	$("#inbox").addClass("active").show();
	$("#headerMain").addClass("active").show();
	Back = ["inbox"];
	
	$('#menuAppriz').fadeOut(300);
	$('.allMenu').css({"right" : "-80%"});
	$('.navAppriz li').eq(0).trigger("tapend");
	
}

function counterByMsg(){
		$('.bubble').eq(0).html( $('.typemsg1.unread.entity'+currentEntityID).length == 0 ? "" : $('.typemsg1.unread').length).css($('.typemsg1.unread.entity'+currentEntityID).length == 0 ? {"display" : "none" } : {"display" : "block"});
		$('.bubble').eq(1).html( $('.typemsg2.unread.entity'+currentEntityID).length == 0 ? "" : $('.typemsg2.unread').length).css($('.typemsg2.unread.entity'+currentEntityID).length == 0 ? {"display" : "none" } : {"display" : "block"});
		$('.bubble').eq(2).html( $('.typemsg3.unread.entity'+currentEntityID).length == 0 ? "" : $('.typemsg3.unread').length).css($('.typemsg3.unread.entity'+currentEntityID).length == 0 ? {"display" : "none" } : {"display" : "block"});
		$('.bubble').eq(3).html( $('.typemsg4.unread.entity'+currentEntityID).length == 0 ? "" : $('.typemsg4.unread').length).css($('.typemsg4.unread.entity'+currentEntityID).length == 0 ? {"display" : "none" } : {"display" : "block"});
		$('.bubble').eq(4).html( $('.typemsg5.unread.entity'+currentEntityID).length == 0 ? "" : $('.typemsg5.unread').length).css($('.typemsg5.unread.entity'+currentEntityID).length == 0 ? {"display" : "none" } : {"display" : "block"});
	
//	$('#leftMenu li').eq(0).find('div div').html($('.unread.entity'+currentEntityID).length);
		//$('#leftMenu li').eq(4).find('div div').html($('.unread').length);
		
		
		$("#entities li").each(function(index, entityI ){
			var bn = $(this).find('.bubble2')
			bn.html($('.unread.entity'+$(this).attr('entityId')).length == 0 ? "" : $('.unread.entity'+$(this).attr('entityId')).length);
			bn.css($('.unread.entity'+$(this).attr('entityId')).length > 0 ? {"border" : "1px solid #dadada"} : {"border" : "0px solid #dadada"});
		});
	}
	
function reportMsgState(){
			var report = {};
			
			$('.Message').each(function( index ) {
				report["m"+$(this).attr("id")] = $(this).hasClass("unread") ? "unread" : "readed"; 
				console.log($(this).attr("id"));
				if($(this).hasAttr('read')){
					var msgS = $(this).attr('read').split(',');
					for(var i = 0 ; i < msgS.length ; i++){
						report["m"+msgS[i]] =  "readed";
					}
				}
				
				if($(this).hasAttr('nread')){
					var msgS = $(this).attr('nread').split(',');
					for(var i = 0 ; i < msgS.length ; i++){
						report["m"+msgS[i]] =  "unread";
					}
				}
				
			});
			console.log(JSON.stringify(report));
			$.post('http://'+IP+':8089/appriz/setMessageStatus', {"idSecretClient": idScretClient, msgStatus:report }, function(data){
				console.log(JSON.stringify(data));
			});
}		

function syncronizeOffLineMsg(){
	if(stateChangeLst.length > 0){
		while( stateChangeLst.length > 0){
			var msg = stateChangeLst.pop();
			if(msg["state"] == "DELETED"){
				$('#'+msg["state"]).remove();
			}else{
				$('#'+msg["state"]).removeClass('unread');
			}
		}
		reportMsgState();
	}
}
		
function makeSwipe(id){
		
			$( 1 ? ".Message" : "#"+id+".message").swipe( {
				
				//Generic swipe handler for all directions
				swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
					oneTimeSendAjax =false;
					var mContainer = $(this).find(".moveContainer");
					var actualMargin = parseInt(mContainer.css("margin-left").replace(/[^-\d\.]/g, '') );
					
					if(direction=='left' & distance > (150) & actualMargin < 0){
							mContainer.css({"margin-left" : "-150px"},{mobileHA: false}); //show delete button
							
					}else if(direction=='left' & distance < (150) & actualMargin < 0){
							mContainer.velocity({"margin-left" : "0px"},{mobileHA: false}); //no show the delete button
							
					}else if(direction=='left' & distance < (window.innerWidth*0.3) & actualMargin > window.innerWidth){
							mContainer.velocity({"margin-left" : window.innerWidth+"px"},{mobileHA: false});
					}else if(direction=='right' & distance > (window.innerWidth*0.3) & actualMargin > window.innerWidth*0.3){
							mContainer.velocity({"margin-left" : window.innerWidth+"px"},{mobileHA: false});
						
					}else if(direction=='right'  & actualMargin >-150){
							mContainer.velocity({"margin-left" : "0px"},{mobileHA: false});
						
					}
					
					else {
						mContainer.velocity({"margin-left" : "0px"},{mobileHA: false});
						
				
					}
				},
				
				swipeStatus:function(event, phase, direction, distance , duration , fingerCount) {
				 if((phase === $.fn.swipe.phases.PHASE_END || phase === $.fn.swipe.phases.PHASE_CANCEL )& distance == 0)  {
						showMessage($(this).attr("id"));
						$.jStorage.set('msg', btoa($('#categories').html()));
						stateChangeLst.push({msg : $(this).parent().parent().parent().attr("id") , state : "READED"});
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
		
				
				
//bring message for this client
		function callNewMSG(){
		
		date = new Date();
		
				$('.refreshing_list').show();
			$.post('http://'+IP+':8089/appriz/getMessagesByClient',{"idSecretClient": idScretClient},function(data){
			//	$('#message_div').html("<div class='refreshing_list'><i class='fa fa-spinner fa-spin'></i> Refreshing ...</div>");aprzSipner
			$('#categories').html("");
				console.log(JSON.stringify(data));
				
				$.each(data,function(index, message){
					if($('#'+message['idMessage']).length > 0){ 
						makeSwipe(message['idMessage']);
						if(message['state'] == 3){
							$('#'+message['idMessage']).removeClass('unread')
						}
							var bulb =  message['bulb'] == 1   ? 'img/ledlightgreen.png' : message['bulb'] == 2   ? 'img/ledlighyellow.png' : message['bulb'] == 3   ? 'img/ledlightred.png' :  'img/ledlighgray.png';
						    $('#'+message['idMessage']).find('.bulb').attr('src',bulb);
					}else{
					//child msg
			
					if( ( 'idParent' in message) && ($('#categories #'+message['idParent']).length>0)){
						
						if(message['state'] == 3){
							$('#categories #'+message['idParent']).attr('read',$('#categories #'+message['idParent']).hasAttr('read') ? $('#categories #'+message['idParent']).attr('read')+','+message['idMessage'] : message['idMessage']);
						}else{
							$('#categories #'+message['idParent']).attr('nread',$('#categories #'+message['idParent']).hasAttr('nread') ? $('#categories #'+message['idParent']).attr('nread')+','+message['idMessage'] : message['idMessage']);
							$('#'+message['idMessage']).addClass('unread');
						}
						if($('#categories #'+message['idParent']).hasAttr('history')){
							$('#categories #'+message['idParent']).attr('history',btoa(atob($('#categories #'+message['idParent']).attr('history'))+";"+message['shortMessage']+":"+message['longMessage']));
							
						}else{
							$('#categories #'+message['idParent']).attr('history',btoa(message['shortMessage']+":"+message['longMessage']));
						}
						console.log(atob($('#categories #'+message['idParent']).attr('history')));

						 
					
					}else{ 
				
						var Icon = message['type'] == 1 ? '<span class="icon-myAlerts"><span class="path1"></span><span class="path2"></span></span>'  : message['type'] == 2 ? '<span class="icon-alerts path1"></span>' : message['type'] == 3 ? '<span class="icon-notifications"></span>' :  message['type'] == 4 ?  '<span class="icon-promotions"></span>' : '<span class="icon-services"></span>';
						var dotState =  message['bulb'] == 1   ? 'dotDone' : message['bulb'] == 2   ? 'dotProgress' : message['bulb'] == 3   ? 'dotError' :  'dotNone';
						
						var postDate = new Date(message['postdate']);
						var postDateS = postDate.getFullYear() + "-"+FormatInteger(postDate.getMonth() + 1,2)+ "-"+FormatInteger(postDate.getDate(),2) +" "+postDate.getHours()+":"+postDate.getMinutes()+":"+postDate.getSeconds();
						$('#categories').append( "<li class='Message "+( message['state'] < 3 ? "unread" : "" )+" typemsg"+message['type']+" entity"+message['idEntity']+"' id='"+message['idMessage']+"' bulb='"+message['bulb']+"' longMSG='"+message['longMessage']+"' services='"+btoa(JSON.stringify(message['services']))+"' appends='"+btoa(JSON.stringify(message['appends']))+"' idEntity='"+message['idEntity']+"'><div class='moveContainer'><div class='details'><h3>"+message['longMessage']+"</h3></div><div class='centralLI'><div class='iconCat'>"+Icon+"</div><div class='infoBank'><h2>"+message['shortMessage']+"</h2><h6 class='dateBank'><span class='icon-primitive-dot "+dotState+"'></span><date>"+postDateS+"<date></h6></div><button class='icon-arrow'><span class='path1'></span><span class='path2'></span></button></div><div class='rightLI'><button class='deleteSwipe'>Delete</button></div ></div></li>");
						
						$.jStorage.set('msg_div', btoa($('#categories').html()));
					
						//console.log(JSON.stringify(data));
					}
					}
					
					$.jStorage.set('msg_div', btoa($('#categories').html()));
				});
				syncronizeOffLineMsg();
			},'json') .fail(function(e) {
					$('.refreshing_list').css({"background-color" : "#888"}).html('Conexion error!').hide(1000,function(){$('.refreshing_list').css({"background-color" : "#F5F5Ff"}).html('Refreshing list');});
			
				//alert( JSON.stringify(e));getRules(kilomanyaroB)
			}).done(function(){ 
				current_inbox();
				counterByMsg();
				makeSwipe();
				fix_messages();
				$.jStorage.set('msg', btoa($('#categories').html()));
				
		//	counterByMsg();$('.refreshing_list').hide(); 
			});
		}
				
				
		//Delete Btn
		$( document ).on("tapend",".deleteSwipe",function(){
			stateChangeLst.push({msg : $(this).parent().parent().parent().attr("id") , state : "DELETED"});
			$(this).parent().parent().parent().remove();
			reportMsgState();
			$.jStorage.set('msg', btoa($('#categories').html()));
			counterByMsg();
		});
				
		//Filter handle
		$( document ).on("tapend",'nav.categoryNav li',function(){
		
			if( $(this).find("span").css("color") == tabSelectedColor){
				$(this).find("span").css({content: "\e60b",color: tabUnSelectedColor});
				$(this).find("span").removeClass("active");
				$('.typemsg'+$(this).attr("typemsg")).hide();
			}else{
				$(this).find("span").css({content: "\e60b",color: tabSelectedColor});
				$(this).find('.path1').css({color: tabSelectedColor});
				$(this).find("span").addClass("active");
				$('.typemsg'+$(this).attr("typemsg")+'[identity='+currentEntityID+']').show();
				
			}
			$("*").scrollTop(0);
		});
		
		$( document ).on("taphold",'nav.categoryNav li',function(){
			$('nav.categoryNav span').css({content: "\e60b",color: tabUnSelectedColor});
			$('#categories li').not($('.typemsg'+$(this).attr("typemsg")+'[identity='+currentEntityID+']')).hide();
			$('nav.categoryNav span').removeClass("active");
			//$(this).css({content: "\e60b",color: tabSelectedColor});
		});
		
		
	
		
		
		