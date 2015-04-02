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
	alert(664);
	alert(url)
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
	

function downloadContentIMG(file,url,version){
	/*if(fSys != null){
		 fSys.root.getFile(file, {create: true, exclusive: false}, 
		 function(fileEntry){
			fileEntry.createWriter(function(writer){
				alert(765);
				$.ajax({
					type: "GET",
					url: url,
					datatype:"image/png",
					success:function(data){
						alert(766);
						writer.write(data);
						$.jStorage.set(file,version);
						alert(767);
					}
				});
			}, fail);
		  }
		 , fail);
	}*/
	
	var fileTransfer = new FileTransfer();
var uri = encodeURI("http://www.autm.net/AM/Images/GET_INVOLVED.jpgp");

fileTransfer.download(
    uri,
    fileURL,
    function(entry) {
       alert("download complete: " + entry.toURL());
    },
    function(error) {
        alert("download error source " + error.source);
        alert("download error target " + error.target);
        alert("upload error code" + error.code);
    },
    true
);
}

	