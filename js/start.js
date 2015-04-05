
function onDeviceReady(){
	try{
		onDeviceReady_fm();
	}catch(e){
	}
	setTimeout(function(){ $(".wConteiner div p").show();},3000);
	checkPreviusLogin();
}



if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
  document.addEventListener("deviceready", onDeviceReady, false);
} else {
  onDeviceReady(); //this is the browser
}



