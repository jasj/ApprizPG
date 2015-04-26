/*
		Login Scripts
		
		Author: Juan Andres Segreda Johanning
		
*/





function login(){
	  //event.preventDefault();
	  var patFemail = /(\S+)@/;
	  try{
	  var logAs = $('.loginBox input').eq(0).val().match(patFemail)[1];
		$.post('http://'+IP+':8089/appriz/login',{
			"email" : $('.loginBox input').eq(0).val(),
			"password":$('.loginBox input').eq(1).val(),
			"phone": typeof device !== 'undefined' ? device.model : "Browser",
			"os": typeof device !== 'undefined' ? device.platform : "Browser",
			"uuid":  typeof device !== 'undefined' ? device.uuid : "Browser",
			"pushKey":  typeof device !== 'undefined' ? PN : "Browser"
		},function(data){
			if(data["status"] == 200){
				$("div#login").hide();
				$("div#appHolder").show();
				$('.wConteiner div').hide();
				idScretClient = data["idSecretClient"];
				$.jStorage.set('idSecretClient', data['idSecretClient']);
				$.jStorage.set('pin', data['pin']);
				$.jStorage.set('logAs', logAs);
				$('.user div').html($.jStorage.get('logAs'));
				reloadEntities();
				
				//$("div#login").fadeOut(1000,function(){checkWithOutEntity()});
				callNewMSG();
				pin = data['pin'];
				atWifi = data["onlyWIFI"];
				retention =  data["retention"];
				//getValidTimePeriods();
				//reloadEntities();
			
			}else{
				showInfoD($.t('Wrong credentials'),$.t('The credentials that you use are invalid'),function(){$('.moldHide, .dialogAlert').hide();});
				$('.loginBox input').eq(1).val("")
				
			}	
	}).fail(function(e) {
		idScretClient = $.jStorage.get('idSecretClient');
		showInfoD($.t("Conexion Error"),$.t("There is a connection error Appriz services"),function(){},function(){})
		
});
	  }catch(e){
		  showInfoD($.t('Wrong credentials'),$.t('The credentials that you use are invalid'),function(){$('.moldHide, .dialogAlert').hide();});
				$('.loginBox input').eq(1).val("")
	  }
}




function offLineMode(){
			if($.jStorage.index().indexOf('idSecretClient') > -1){
			idScretClient = $.jStorage.get('idSecretClient');
			$("#login").hide();
			$("#appHolder").show();
			if($.jStorage.index().indexOf('msg') > -1){$('#categories').html(atob($.jStorage.get('msg')));}
			if($.jStorage.index().indexOf('entities') > -1){$('#entities ul').html(atob($.jStorage.get('entities')));}
			if($.jStorage.index().indexOf('currentEntityID') > -1){currentEntityID = $.jStorage.get('currentEntityID');}
			if($.jStorage.index().indexOf('onlyWIFI') > -1){atWifi = $.jStorage.get('onlyWIFI');} else{ atWifi =1}
			if($.jStorage.index().indexOf('retention') > -1){retention = $.jStorage.get('retention');}else{ retention =4}
			$('.user div').html($.jStorage.get('logAs'));
			current_inbox();
			counterByMsg();
			makeSwipe();
			makeSwipeEntity();
			currentEntityID = $.jStorage.get('currentEntityID');
			loadEntityTemplate();
			$("div#appHolder").show();
			$('.wConteiner div').hide();
				$("div#login").fadeOut(1000,function(){checkWithOutEntity()});
				
			
			showInfoD($.t("Offline Mode"),$.t("some features are not enabled in this mode"),function(){});
		}
}



function checkPreviusLogin(){
	if($.jStorage.index().indexOf('msg') > -1){$('#categories').html(atob($.jStorage.get('msg')));}
	setTimeout(function(){$('#Waiting p').show();},3000);
	currentEntityID  = ($.jStorage.index().indexOf('currentEntityID') > -1  ) ? $.jStorage.get('currentEntityID') : 0;
	$.post('http://'+IP+':8089/appriz/getCurrentSession',{uuid:  typeof device !== 'undefined' ? device.uuid : "Browser" },function(data) {
	if("idSecretClient" in data ){
			//	navigator.splashscreen.hide();
				
				if(data["pinPolicy"]==0){$('#divPIN').show();}
				idScretClient = data["idSecretClient"];
				logId = data["logId"];
				pinPolicy = data["pinPolicy"];
				pin = data["pin"];
				atWifi = data["onlyWIFI"];
				retention =  data["retention"];
				$.jStorage.set('idSecretClient', data['idSecretClient']);
				$.jStorage.set('pin', data['pin']);
				$.jStorage.set('retention', data['retention']);
				$.jStorage.set('onlyWIFI', data['onlyWIFI']);
				$('.user div').html($.jStorage.get('logAs'));
				currentEntityID = $.jStorage.get('currentEntityID');
				loadEntityTemplate();
				$('.splash').fadeOut(1000,function(){});
				reloadEntities();
				callNewMSG();
				
				if(pinPolicy==0){
					$('#pin').show();
				
					$('#categories').hide();
					$('#ads').hide();
					$('.categoryNav').hide();
					
				//	$('.fullWrapper').hide();
					$('.icon-menu').hide();
					
				}
				$("div#appHolder").show();
				$('.wConteiner div').hide();
				
				$("div#login").fadeOut(1000,function(){	});
			
				
				
				//$('link[typeCss="bank"]').attr('href','https://s3.amazonaws.com/tst_appriz_clients/'+FormatInteger(currentEntityID,4)+'/CSS/theme.css');
				//$('.header_demo img').attr('src','https://s3.amazonaws.com/tst_appriz_clients/'+FormatInteger(currentEntityID,4)+'/Advertising/Logos/big_logo.png');
				//counterByMsg();
				//current_inbox();
		}else{
			//navigator.splashscreen.hide();
				$("#Waiting").fadeOut(1000,function(){});
		};

		
	}).fail(function(e) {
			offLineMode();
	});
	
}

$( document ).on("tapend","button.log",function(){
	$.jStorage.flush();
	$.post('http://'+IP+':8089/appriz/logout', {"logId" : logId}, function(data){
		$.jStorage.flush();
		try{navigator.splashscreen.show();}catch(e){}
		window.location.reload(true);
	});
});



/*--------------------------------------------------
	Events 
---------------------------------------------------*/
$( document ).on('tapend','.btnFull.submitLogin',function(){ login();});
$( document ).on('tapend','#Waiting p',function(){offLineMode();});

$(".loginBox input").eq(1).keyup(function (e) {
    if (e.keyCode == 13) {
       login();
    }
});

