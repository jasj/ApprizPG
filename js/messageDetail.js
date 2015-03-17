
$( document ).on('tapend','.optionBtn',function(){
	
	if($('.dropdownOption').css("bottom") == "50px"){
	//	alert($('.dropdownOption').height() );
		$('.dropdownOption').velocity({'bottom': (-$('.dropdownOption').height()-50)+"px"});
	}
	else{
		$('.dropdownOption').velocity({'bottom' : '50px'});
	}
});