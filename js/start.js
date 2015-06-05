
function onDeviceReady(){
	
	try{
		onDeviceReady_fm();
		onDeviceReady_pn();
		document.addEventListener("backbutton", backKeyDown, true);
	    document.addEventListener("menubutton", menuKeyDown, true);
	}catch(e){
	}
	setTimeout(function(){ $(".wConteiner div p").show();},3000);
	
	
	checkPreviusLogin();
	console.log("onDeviceReady");
	reportMsgState();
	


}



if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
  document.addEventListener("deviceready", onDeviceReady, false);
} else {
  onDeviceReady(); //this is the browser
}



