 document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
        window.resolveLocalFileSystemURI("file:///example.txt", onResolveSuccess, fail);
    }

    function onFileSystemSuccess(fileSystem) {
        console.log(fileSystem.name);
    }

    function onResolveSuccess(fileEntry) {
        console.log(fileEntry.name);
    }

    function fail(error) {
        console.log(error.code);
    }
