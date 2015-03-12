/* 
by Juan Andres Segreda Johanning
CSS fixing (due old android browsers)

*/


function fix_messages(){
	$("#categories .centralLI").css({"width" : (window.innerWidth*2 +150)+"px"});
	$("#categories .rightLI").css({"width" : (window.innerWidth +150)+"px"});
	$("#categories .details").css({"width" : (window.innerWidth -20)+"px"});
	$("#categories li .infoBank").css({"width" : (window.innerWidth -160)+"px"});
	
	
}