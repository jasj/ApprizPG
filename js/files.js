 document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
        window.resolveLocalFileSystemURI("file:///example.txt", onResolveSuccess, fail);
		alert("fready");
	}

    function onFileSystemSuccess(fileSystem) {
       alert(fileSystem.name);
    }

    function onResolveSuccess(fileEntry) {
        alert(fileEntry.name);
    }

    function fail(error) {
       alert(error.code);
    }
