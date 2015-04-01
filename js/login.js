/*
		Login Scripts
		
		Author: Juan Andres Segreda Johanning
		
*/





function login(){
	  //event.preventDefault();
		$.post('http://'+IP+':8089/appriz/login',{
			"email" : $('.loginBox input').eq(0).val(),
			"password":$('.loginBox input').eq(1).val(),
			"phone": typeof device !== 'undefined' ? device.model : "Browser",
			"os": typeof device !== 'undefined' ? device.platform : "Browser",
			"pushKey":  typeof device !== 'undefined' ? device.uuid : "Browser"
		},function(data){
			if(data["status"] == 200){
				$("div#login").hide();
				$("div#appHolder").show();
				idScretClient = data["idSecretClient"];
				$.jStorage.set('idSecretClient', data['idSecretClient']);
				$.jStorage.set('pin', data['pin']);
				reloadEntities();
				callNewMSG();
				pin = data['pin'];
				//getValidTimePeriods();
				//reloadEntities();
			
			}else{
				showInfoD($.t('Wrong credentials'),$.t('The credentials that you use are invalid'),function(){$('.moldHide, .dialogAlert').hide();});
				$('.loginBox input').eq(1).val("")
				
			}	
	}).fail(function(e) {
		alert(e);
		idScretClient = $.jStorage.get('idSecretClient');
		showInfoD($.t("Conexion Error"),$.t("There is a connection error Appriz services"),function(){},function(){})
		
});
	
}


function checkPreviusLogin(){
	currentEntityID  = ($.jStorage.index().indexOf('currentEntityID') > -1  ) ? $.jStorage.get('currentEntityID') : 0;
	$.post('http://'+IP+':8089/appriz/getCurrentSession',{pushKey:  typeof device !== 'undefined' ? device.uuid : "Browser" },function(data) {
	if("idSecretClient" in data ){
			//	navigator.splashscreen.hide();
				$("div#login").hide();
				$("div#appHolder").show();
				if(data["pinPolicy"]==0){$('#divPIN').show();}
				idScretClient = data["idSecretClient"];
				logId = data["logId"];
				pinPolicy = data["pinPolicy"];
				pin = data["pin"];
				$.jStorage.set('idSecretClient', data['idSecretClient']);
				$.jStorage.set('pin', data['pin']);
				
				$('.splash').fadeOut(1000,function(){});
	
				callNewMSG();
				
				reloadEntities();
				
				//$('link[typeCss="bank"]').attr('href','https://s3.amazonaws.com/tst_appriz_clients/'+FormatInteger(currentEntityID,4)+'/CSS/theme.css');
				//$('.header_demo img').attr('src','https://s3.amazonaws.com/tst_appriz_clients/'+FormatInteger(currentEntityID,4)+'/Advertising/Logos/big_logo.png');
				//counterByMsg();
				//current_inbox();
		}else{
			//navigator.splashscreen.hide();
				$('.splash').fadeOut(1000,function(){
				var heightEnd = Math.floor(window.innerHeight /2)-120;
				$('.LOGIN_FORM').css({"top" : heightEnd+"px"});
				$( '.LOGIN_BOTTOM , .LogginTop').velocity({"height" : 0},1000); 
			
			});

		}
	}).fail(function(e) {
		if($.jStorage.index().indexOf('idSecretClient') > -1){
			idScretClient = $.jStorage.get('idSecretClient');
			$("#login").hide();
			$("#appHolder").show();
			if($.jStorage.index().indexOf('msg') > -1){$('#categories').html(atob($.jStorage.get('msg')));}
			if($.jStorage.index().indexOf('entities') > -1){$('#entities ul').html(atob($.jStorage.get('entities')));}
			current_inbox();
			counterByMsg();
			makeSwipe();
			loadEntityTemplate()
			showInfoD($.t("Offline Mode"),$.t("some features are not enabled in this mode"),function(){});
		}
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