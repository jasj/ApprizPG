/* 
by Juan Andres Segreda Johanning
CSS fixing (due old android browsers)

*/


function fix_messages(){
	//alert(window.innerWidth);
	$("#categories .moveContainer").css({"left" : (0-window.innerWidth -21)+"px"});
	$("#categories .centralLI").css({"width" : (window.innerWidth*2 +150)+"px"});
	$("#categories .centralLI").css({"left" : (window.innerWidth +20)+"px"});
	$("#categories .rightLI").css({"width" : (window.innerWidth +150)+"px"});
	$("#categories .details").css({"width" : (window.innerWidth -20)+"px"});
	$("#categories li .infoBank").css({"width" : (window.innerWidth -160)+"px"});
	$(".dateBank").css({"width" : (window.innerWidth -160)+"px"});
		
}

$("body").css({"height" : window.innerHeight});
$(".details_").css({"width" : (window.innerWidth - window.innerWidth*2*0.04)});