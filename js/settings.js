$(document).on('tapend' ,'#settingsPage .btnFull', function(){
	$.post('http://'+IP+':8089/appriz/setAprzCustomerSettings',{
		idSecretClient			:  idScretClient,
		retention   			: $('.unikOptions.settings .active').attr('weeks'),
		pinPolicy   			: $("#flip-3 option:selected").val()
	}, function(data){
		showInfoD('Change Settings','The settings was changed!',function(){$('.moldHide, .dialogAlert').hide(); pinPolicy  = $("#flip-3 option:selected").val()});
	});
});

$('#passwordChg .btnFull').tapend(function(){
	if($('#passwordChg input[type="password"]').eq(0).val().length > 8){
		if($('#passwordChg input[type="password"]').eq(0).val() != $('#passwordChg input[type="password"]').eq(1).val()){
	showInfoD('Wrong data','Passwords do not match',function(){$('.moldHide, .dialogAlert').hide();});} else{
	
		$.post('http://'+IP+':8089/appriz/setAprzCustomerSettings',{
		idSecretClient			:  idScretClient,
		password   			: $('#passwordChg input[type="password"]').eq(0).val()
	}, function(data){
		showInfoD('Change password','The password was changed!',function(){$('.moldHide, .dialogAlert').hide(); });
	});
	
	}
	}else{
		showInfoD('Wrong password','The password must be at least 9 chars length',function(){$('.moldHide, .dialogAlert').hide();});
	}


});

$('#pinChg .btnFull').tapend(function(){
	var patt = /^\d{4}$/;
	if( patt.test($('#pinChg input[type="tel"]').eq(0).val())){
			$.post('http://'+IP+':8089/appriz/setAprzCustomerSettings',{
		idSecretClient			:  idScretClient,
		pin   			: $('#pinChg input[type="tel"]').eq(0).val()
	}, function(data){
		showInfoD('Change pin','The pin was changed!',function(){$('.moldHide, .dialogAlert').hide(); pin = $('#pinChg input[type="tel"]').eq(0).val()});
	});
	}else{
		showInfoD('Wrong Accses Code','The Accses code must be of fourth digits',function(){$('.moldHide, .dialogAlert').hide();});
	}

	


});