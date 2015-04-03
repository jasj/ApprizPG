$(document).on('tapend' ,'#settingsPage .btnFull', function(){
	$.post('http://'+IP+':8089/appriz/setAprzCustomerSettings',{
		idSecretClient			:  idScretClient,
		retention   			:  parseInt($('.isThis').find('span').html()),
		pinPolicy   			:  $("#pinPolicy").prop('checked') ? 0 : 1,
		onlyWIFI				:  $("#atWifi").prop('checked') ? 1 : 0
	}, function(data){
		showInfoD($.t('Change Settings'),$.t('The settings was changed!'),function(){$('.moldHide, .dialogAlert').hide(); 
		pinPolicy  =  $("#pinPolicy").prop('checked') ? 0 : 1});
		atWifi =  $("#atWifi").prop('checked') ? 1 : 0;
		retention =   parseInt($('.isThis').find('span').html());
	});
});

$('#passwordChg .btnFull').tapend(function(){
	if($('#passwordChg input[type="password"]').eq(0).val().length > 8){
		if($('#passwordChg input[type="password"]').eq(0).val() != $('#passwordChg input[type="password"]').eq(1).val()){
	showInfoD($.t('Wrong data'),$.t('Passwords do not match'),function(){$('.moldHide, .dialogAlert').hide();});} else{
	
		$.post('http://'+IP+':8089/appriz/setAprzCustomerSettings',{
		idSecretClient			:  idScretClient,
		password   			: $('#passwordChg input[type="password"]').eq(0).val()
	}, function(data){
		showInfoD($.t('Change password'),$.t('The password was changed!'),function(){$('.moldHide, .dialogAlert').hide(); });
		$('.icon-back').trigger('tapend');
	});
	
	}
	}else{
		showInfoD($.t('Wrong password'),$.t('The password must be at least 9 chars length'),function(){$('.moldHide, .dialogAlert').hide();});
		$('#passwordChg input[type="password"]').eq(0).val("");
		$('#passwordChg input[type="password"]').eq(1).val("");
	}


});

$('#pinChg .btnFull').tapend(function(){
	var patt = /^\d{4}$/;
	if( patt.test($('#pinChg input[type="tel"]').eq(0).val())){
			$.post('http://'+IP+':8089/appriz/setAprzCustomerSettings',{
		idSecretClient			:  idScretClient,
		pin   			: $('#pinChg input[type="tel"]').eq(0).val()
	}, function(data){
		showInfoD($.t('Change pin'),$.t('The pin was changed!'),function(){$('.moldHide, .dialogAlert').hide(); pin = $('#pinChg input[type="tel"]').eq(0).val()});
		$('.icon-back').trigger('tapend');
	});
	}else{
		showInfoD($.t('Wrong PIN'),$.t('PIN must be of fourth digits'),function(){$('.moldHide, .dialogAlert').hide();});
		$('#pinChg input[type="tel"]').eq(0).val("");
	}
});

$( document ).on('tapend','[page-content=settingsPage]',function(){
	$('#pinPolicy').prop('checked', pinPolicy == 1 ? false : true);
	$('#atWifi').prop('checked', atWifi == 1 ? true : false);
	$("#settingsPage .weeksOption input").prop('checked', false);
	$("#settingsPage [week="+(retention =="undefined" ? 4 : retention)+"]").prev().prop('checked', true);
});