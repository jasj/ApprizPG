$("#demo[header=headerGeneral] button").tapend(function(){
	console.log("Sending Demo Request");
	requestService({"productName": "Ahorro-250","code": "DEMO-en", "description": "DEMO","entityName" : $('#entities li[entityId='+currentEntityID+']').find('img').attr("alt"),"demo" : "demo"});
	
});