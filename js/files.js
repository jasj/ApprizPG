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
		readDAtaUrl("readme.txt");
    }
	
	function readDAtaUrl(file) {
    var reader = new FileReader();
    reader.onloadend = function (evt) {
        console.log("read success");
        console.log(evt.target.result);
    };
    alert(reader.readAsDataURL(file));
	
	
};


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