var PINpos = 0;
var vPIN = "";

$( document ).on( "tapend", ".numKey", function() {
	$('.passkey').eq(PINpos).html('<i class="fa fa-circle"></i>');
	vPIN = vPIN+$(this).html().trim(); 
	PINpos++;
	if(PINpos == 4){
		if(vPIN == pin) {
			$('#divPIN').hide();
			
		
			//if(){
				$('#sb_inbox').html('Products');
			//}
			}else{
					showInfoD('Wrong PIN','The PIN that you used is invalid',function(){});
			}
			$('.passkey').html('');
			PINpos = 0; vPIN= "";
	}
 });
 
$( document ).on( "tapend", ".delKey", function() { 
	if(PINpos > 0){
		PINpos--;
		$('.passkey').eq(PINpos).html('');
		vPIN = vPIN.substring(0, vPIN.length-1);
	}
 });