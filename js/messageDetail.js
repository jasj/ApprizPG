

function showMessage(id){
	back.push( "inbox" );
	$(".page-content.active").removeClass("active");
		$("#MessageDetail.page-content").addClass("active").show();
		
		$('.dropdownOption').css({'bottom': (-$('.dropdownOption').height()-50)+"px"});
		$(".appends").css({"z-index": 40});
		$("header.active").removeClass("active");
		$("#headerEntity").addClass("active");
		
}

$( document ).on('tapend','.optionBtn',function(){
	
	if($('.dropdownOption').css("bottom") == "50px"){
	//	alert($('.dropdownOption').height() );
		$('.dropdownOption').velocity({'bottom': (-$('.dropdownOption').height()-50)+"px"});
		$(".appends").css({"z-index": 40});
	}
	else{
		$(".appends").css({"z-index": 0});
		$('.dropdownOption').velocity({'bottom' : '50px'});
	}
});