
function addProducts(products,view){
	$('#products_div').html('');
	for( product in products){
		$('#products_div').append('<div class="product '+view+'">'+product+'</div>');
	}
	$('products_div').append("<div style='width: 100%; height: 150px;'></div>");
}
function getProducts(view){
	if(pinPolicy==1){$('#divPIN').show();}
		$.post('http://'+IP+':8089/appriz/getProductsByClient',{"idSecretClient": idScretClient,"entityName": $('#entities li[entityId='+currentEntityID+']').find('img').attr("alt"),"view":view,},function(data){
			console.log(JSON.stringify(data));
			
			if (data["status"]== 200){
				addProducts(data["products"],view);
			}
		
	},'json') .fail(function(e) {
		//	alert("conexion error!");
		//alert( JSON.stringify(e));
	}).done(function(){$('#products p.title').html((view == 'rules' ? 'My Alerts' : 'Services')+'<i class="fa fa-angle-double-right"></i>Products </p>')});
}