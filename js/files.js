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

 
 // Wait for device API libraries to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    }

    function gotFS(fileSystem) {
        fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, gotFileEntry, fail);
		
    }

    function gotFileEntry(fileEntry) {
        fileEntry.createWriter(gotFileWriter, fail);
		alert("write");
		readDAtaUrl("readme.txt");
    }
	
	function readDAtaUrl(file) {
    var reader = new FileReader();
    reader.onloadend = function (evt) {
        console.log("read success");
        alert(evt.target.result);
		
		
    };
	alert("read");
  //  alert(reader.readAsDataURL(file));
	
	
};


    function gotFileWriter(writer) {
		alert(1);
	$.get("https://s.yimg.com/zz/combo?pv/static/lib/srp-core-css-purple_3acecc2e83faa9ba766268df3f1c20c1.css",function(data){
		 writer.write(data);
		 alert(data);
	  });
       
    }

    function fail(error) {
		alert(error);
        console.log(error.code);
    }

	
$(document).ready(function() {
	// This worked for me
	var ft = new FileTransfer();
	ft.download(
		"http://www.bargainstock.co.uk/Photos/p400.jpg", // what u download
		fileSystem.root.toURL() + "test.jpg", // this is the filename as well complete url
  function(entry) {
    alert("success");
    alert(JSON.stringify(entry));

  },
  function(err) {
    alert(err);
    alert(JSON.stringify(err));
  }
);
});