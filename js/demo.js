$("#demo[header=headerGeneral] button").tapend(function(){
	console.log("Sending Demo Request");
	requestService({"productName": "My Debit Card-5412","code": "DEMO-en", "description": "DEMO","entityName" : $('#entities li[entityId='+currentEntityID+']').find('img').attr("alt"),"demo" : "demo"});
	
});