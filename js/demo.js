$("#demo[header=headerGeneral] button").tapend(function(){
	requestService({"productName": "My Debit Card-5412","id" : "CMT0028" ,"code": "DEMO-en", "description": "DEMO","entityName" : $('#entities li[entityId='+currentEntityID+']').find('img').attr("alt"),"demo" : "demo"});
	
});