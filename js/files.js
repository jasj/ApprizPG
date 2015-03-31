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
		alert(gotFS);
    }

    function gotFileEntry(fileEntry) {
        fileEntry.createWriter(gotFileWriter, fail);
		alert(gotFileEntry);
    }

    function gotFileWriter(writer) {
		alert(gotFileWriter);
        writer.onwriteend = function(evt) {
            console.log("contents of file now 'some sample text'");
            writer.truncate(11);
            writer.onwriteend = function(evt) {
                console.log("contents of file now 'some sample'");
                writer.seek(4);
                writer.write(" different text");
                writer.onwriteend = function(evt){
                    console.log("contents of file now 'some different text'");
                }
            };
        };
        writer.write("some sample text");
    }

    function fail(error) {
		alert(error);
        console.log(error.code);
    }

	
	  $(document).ready(function() {

	$.get("https://s.yimg.com/zz/combo?pv/static/lib/srp-core-css-purple_3acecc2e83faa9ba766268df3f1c20c1.css",function(data){
		alert(1);
		alert(data);
	  });}