document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
	
fSys = null;

function onDeviceReady() {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

function gotFS(fileSystem) {
	fSys = fileSystem;
}

function getFileLocalURL(file, object, target){
	if(fSys != null){
		 fSys.root.getFile(file, {create: true, exclusive: false}, 
		 function(fileEntry){
			 object.attr(target,fileEntry.toURL());
		 }
		 , fail);
	}
}

function downloadContent(file,url,version){
	//alert(664);
	//alert(url)
	if(fSys != null){
		 fSys.root.getFile(file, {create: true, exclusive: false}, 
		 function(fileEntry){
			fileEntry.createWriter(function(writer){
				alert(665);
				$.get(url,function(data){
					alert(666);
					writer.write(data);
					$.jStorage.set(file,version);
					alert(667);
				}).fail(function(e){alert(JSON.stringify(e))});
			}, fail);
		  }
		 , fail);
	}
}

    
function fail(e) {
	var msg = '';

  switch (e.code) {
   
    case FileError.NOT_FOUND_ERR:
		msg = 'NOT_FOUND_ERR Error';
    break;	
    case FileError.SECURITY_ERR:
		msg = 'SECURITY_ERR Error';
    break;
    case FileError.ABORT_ERR:
		msg = 'ABORT_ERR Error';
    break;
    case FileError.NOT_READABLE_ERR:
		msg = 'NOT_READABLE_ERR Error';
    break;
    case FileError.ENCODING_ERR:
		msg = 'ENCODING_ERR Error';
    break;
    case FileError.NO_MODIFICATION_ALLOWED_ERR:
		msg = 'NO_MODIFICATION_ALLOWED_ERR Error';
    break;
    case FileError.INVALID_STATE_ERR:
		msg = 'INVALID_STATE_ERR Error';
    break;
    case FileError.SYNTAX_ERR:
		msg = 'SYNTAX_ERR Error';
    break;
    case FileError.INVALID_MODIFICATION_ERR:
		msg = 'INVALID_MODIFICATION_ERR Error';
    break;
    case FileError.QUOTA_EXCEEDED_ERR:
		msg = 'QUOTA_EXCEEDED_ERR Error';
    break;
    case FileError.TYPE_MISMATCH_ERR:
		msg = 'TYPE_MISMATCH_ERR Error';
    break;
    case FileError.PATH_EXISTS_ERR:
		msg = 'PATH_EXISTS_ERR';
    break;

	  
    default:
      msg = 'Unknown Error';
      break;
  };

  //alert('Error: ' + msg);
}
	

function downloadContentIMG(file,url,version){
	
	if(fSys != null){
		var fileTransfer = new FileTransfer();
		var uri = encodeURI(url);

		fileTransfer.download(
			uri,
			cordova.file.documentsDirectory + file,
			function(entry) {
			  // alert("download complete: " + entry.toURL());
			},
			function(error) {
				//alert("download error source " + error.source);
				//alert("download error target " + error.target);
				fail(error);
			},
			true
		);
	}
}

	