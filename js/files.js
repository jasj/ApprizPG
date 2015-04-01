document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
	
fSys = null;

function onDeviceReady() {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

function gotFS(fileSystem) {
	fSys = fileSystem;
   // fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, gotFileEntry, fail);
}

function getFileLocalURL(file, object, target){
	if(fSys != null){
		 fSys.root.getFile(file, {create: true, exclusive: false}, 
		 function(fileEntry){
			 object.attr(target,fileEntry.toURL());
			 alert(fileEntry.toURL());
		 }
		 , fail);
	}
}

function downloadContent(file,url){
	if(fSys != null){
		 fSys.root.getFile(file, {create: true, exclusive: false}, 
		 function(fileEntry){
			fileEntry.createWriter(function(writer){
				$.get(url,function(data){
					writer.write(data);
					alert(data);
				});
			}, fail);
		  }
		 , fail);
	}
}

    
function fail(error) {
	console.log(error);
}

	