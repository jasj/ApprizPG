window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
var fs = null;

function errorHandler(e) {
  var msg = '';
  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };
  alert('Error: ' + msg);
}

function initFS() {
  window.requestFileSystem(window.PERSISTENT , 1024*1024, function(filesystem) {
    fs = filesystem;
	alert("sinc")
  }, errorHandler);
}


// Initiate filesystem on page load.
if (window.requestFileSystem) {
  initFS();
}else{
	console.log("requestFileSystem nop");
}