
function addRules(objs){
	var toAppend = '';
	$('#rules_div').html('');
	$.each(objs,function(index,obj){;
		toAppend = "<div class='rule' id='rule_"+obj["idRule"]+"'><div class='rule_header'><div class='rule_header_txt'><p>"+obj["ruleName"]+"</p></div>";
		toAppend = toAppend + "<input type='checkbox' name='toggle_"+obj["idRule"]+"' id='toggle_"+obj["idRule"]+"' class='toggle' "+(obj["active"] ? "checked" : "")+"><label for='toggle_"+obj["idRule"]+"'></label></div>";
		toAppend = toAppend + "<div class='rule_body'><p align='justify' style='100%'>"+obj["description"].replace(/<\[singleAmount\]>/g,"<singleAmount>"+obj['singleAmount']+"</singleAmount>").replace(/<\[trxNo\]>/g,"<trxNo>"+obj['trxNo']+"</trxNo>").replace(/<\[idTime\]>/g,"<idTime>"+obj['idTime']+"</idTime>").replace(/<\[totalAmount\]>/g,"<totalAmount>"+obj['totalAmount']+"</totalAmount>").replace(/<\[varation\]>/g,"<varation>"+obj['varation']+"</varation>") +"</p><table>";
		if("trxNo" in obj ) toAppend = toAppend + "<tr><th>Trx No.</th><td><input type='tel' field='trxNo' maxlength='10'  placeholder='"+obj["trxNo"]+"'></td></tr>";
		if("singleAmount" in obj ) toAppend = toAppend + "<tr><th>Amount</th><td><input type='tel' field='singleAmount' maxlength='10'  placeholder='"+obj["singleAmount"]+"'/></td></tr>";
		if("totalAmount" in obj ) toAppend = toAppend + "<tr><th>Total Amount</th><td><input type='tel' field='totalAmount' maxlength='10'  placeholder='"+obj["totalAmount"]+"'/></td></tr>";
		if("varation" in obj ) toAppend = toAppend + "<tr><th>Variation</th><td><input type='tel' field='varation' maxlength='10' placeholder='"+obj["varation"]+"'/></td></tr>";
		if("idTime" in obj ) toAppend = toAppend + "<tr><th>Time</th><td><select class='SelectStyle'>"+SPickerString+"</select></td></tr>";
		toAppend = toAppend + "</table></div></div>";
		$('#rules_div').append(toAppend);
		if("idTime" in obj ) {$('select:last option[value="'+obj["idTime"]+'"]').prop('selected', true); $('idTime:last').html($('select:last option[value="'+obj["idTime"]+'"]').html());}
	});
	$('#rules_div').append("<div style='width: 100%; height: 150px;'></div>");
	
}

function getRules(productName){

		$.post('http://'+IP+':8089/appriz/getRulesByProduct',{"idSecretClient": idScretClient,"productName":productName,},function(data){
			if (data["status"]== 200){
				addRules(data["rules"]);
			}
		
	},'json') .fail(function(e) {
		//	alert("conexion error!");
		//alert( JSON.stringify(e));
	}).done(function(){$('.refreshing_list').hide(); });
	
}

$( document ).on("tapend","[page-content=services]",function(){
	getServices($(this).find("prd").html());
});

$( document ).on('tapend','#rules li h3',function(){
	$(this).parent().find('.dropdownBox').toggle();
});