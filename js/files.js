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
	if(fSys != null){
		 fSys.root.getFile(file, {create: true, exclusive: true}, 
		 function(fileEntry){
			fileEntry.createWriter(function(writer){
				$.get(url,function(data){
					writer.write(data);
					$.jStorage.set(file,version);
					alert(667);
				});
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
	

$.ajax({
    type: "GET",
    url: "http://cdn-careers.sstatic.net/careers/gethired/img/companypageadfallback-leaderboard-2.png",
    datatype:"image/png",
    success: function (data) {
		alert(333);
    //    alert( data);
      }
 });

	