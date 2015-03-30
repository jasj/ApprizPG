$('#suscribe .btnFull').tapend(function(){
	$.post('http://'+IP+':8089/appriz/subscribeCustomer', {
		identification 	        :  $('#suscribe input').eq(0).val(),
		subscriptionNumber      :  $('#suscribe input').eq(1).val(),
		idSecretClient			:  idScretClient,
		regId : "1" //from device
	},function(data){
	
		if (data["status"] == 200){
			$('#menuBtn').show();
			reloadEntities();
			showAlert($.t('Subscription Sucessfull'), $.t("You was succesfully subscribe to")+": <b>"+data["entityName"]+"</b>. "+$.t("Do you want to subscribe another entity? "),
				function(){
					$('.moldHide, .dialogAlert').hide();
					$('#suscribe input').eq(0).val("");
					$('#suscribe input').eq(1).val("");
				},
				function(){
					$('.moldHide, .dialogAlert').hide();
					$('#suscribe input').eq(0).val("");
					$('#suscribe input').eq(1).val("");
					$('#Suscri').hide();
				}
			);
		}else{
			showInfoD($.t('Wrong subscription data'),$.t('No valid subscription data'),function(){$('.moldHide, .dialogAlert').hide();});
		}
	});
	
});
