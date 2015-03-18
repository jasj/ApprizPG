
/*
	Generics
	
	
*/


function showInfoD(title,text,okFx){
	
	$('#modal1Btn h2').html(title);
	$('#modal1Btn p').html(text);
	
	$('#modal1Btn').show();
	$( document ).on('click','.okBtn',function(){
		$('#modal1Btn').hide();
		okFx();
	});

}
