
/*
	Generics
	
	
*/

function FormatInteger(num, length) {
			return (num / Math.pow(10, length)).toFixed(length).substr(2);
}
		


function showInfoD(title,text,okFx){
	
	$('#modal1Btn h2').html(title);
	$('#modal1Btn p').html(text);
	
	$('#modal1Btn').show();
	$( document ).on('click','.okBtn',function(){
		$('#modal1Btn').hide();
		okFx();
	});

}


function showAlert(title,text,yesFn,noFn){
	$('#modal2Btn h2').html(title);
	$('#modal2tn p').html(text);
	
	$('#modal2Btn').show();
	$( document ).on('click','.yesBtn',function(){
		$('#modal2Btn').hide();
		yesFn();
	});
	$( document ).on('click','.yesBtn',function(){
		$('#modal2Btn').hide();
		noFn();
	});
}
