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
		alert(gotFileEntry);
    }

    function gotFileWriter(writer) {
		
	$.get("https://s.yimg.com/zz/combo?pv/static/lib/srp-core-css-purple_3acecc2e83faa9ba766268df3f1c20c1.css",function(data){
		 writer.write(data);
	  });
       
    }

    function fail(error) {
		alert(error);
        console.log(error.code);
    }

	
$(document).ready(function() {
	
});





var fileTransfer = new FileTransfer();
var uri = encodeURI("https://s.yimg.com/zz/combo?pv/static/lib/srp-core-css-purple_3acecc2e83faa9ba766268df3f1c20c1.css");
fileURL =  "cdvfile://localhost/persistent/path/to/file.txt";
fileTransfer.download(
    uri,
    fileURL,
    function(entry) {
		alert("hi");
        console.log("download complete: " + entry.toURL());
    },
    function(error) {
        console.log("download error source " + error.source);
        console.log("download error target " + error.target);
        console.log("upload error code" + error.code);
    },
    false,
    {
        headers: {
            "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
        }
    }
);