
function onDeviceReady(){
	
	checkPreviusLogin();
	onDeviceReady_fm();
}



if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
  document.addEventListener("deviceready", onDeviceReady, false);
  alert(12);
} else {
	alert(1);
  onDeviceReady(); //this is the browser
}



