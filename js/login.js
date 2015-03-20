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
				pin = data['pin'];
			//	getValidTimePeriods();
				
				reloadEntities();
			
			}else{
				showInfoD('Wrong credentials','The credential that you use is invalid',function(){$('.moldHide, .dialogAlert').hide();});
				$('.loginBox input').eq(1).val("")
				
			}	
	}) .fail(function() {
			alert( "error" );
});
	
}

/*--------------------------------------------------
	Events 
---------------------------------------------------*/
$( document ).on('tapend','.btnFull.submitLogin',function(){ login();});