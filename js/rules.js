function timePicker(objs){
		timePickerString = '<fieldset class="ui-field-contain">';
		$.each(objs,function(index,obj){
			timePickerString = timePickerString + "<option value='"+obj["idTime"]+"'>"+obj["amount"]+" "+obj["unit"]+"</option>";
		});
		return timePickerString+"</fieldset>";
	}
function addRules(objs){
	var toAppend = '';
	$('#rules .products ul').html('');
	
	
						
	$.each(objs,function(index,obj){;
		toAppend  =  "<li class='rule' id='rule_"+obj["idRule"]+"'><h3>"+obj["ruleName"]+"</h3>";
	//	toAppend +=  " <div class='onoffswitch'><input type='checkbox' name='onoffswitch' class='onoffswitch-checkbox' id='switchRule"+obj["idRule"]+"' "+(obj["active"] ? "checked" : "")+">";
		toAppend +=   "<div class='onoffswitch'><input type='checkbox' name='toggle_"+obj["idRule"]+"' id='toggle_"+obj["idRule"]+"' class='toggle' "+(obj["active"] ? "checked" : "")+"><label for='toggle_"+obj["idRule"]+"'></label></div>";
		toAppend +=  "<div class='dropdownBox'>";
		toAppend +=  "<p>"+obj["description"].replace(/<\[singleAmount\]>/g,"<singleAmount>"+obj['singleAmount']+"</singleAmount>").replace(/<\[trxNo\]>/g,"<trxNo>"+obj['trxNo']+"</trxNo>").replace(/<\[idTime\]>/g,"<idTime>"+obj['idTime']+"</idTime>").replace(/<\[totalAmount\]>/g,"<totalAmount>"+obj['totalAmount']+"</totalAmount>").replace(/<\[varation\]>/g,"<varation>"+obj['varation']+"</varation>") +"</p><div class='editOption'><ul>";
	//	toAppend += "<div class='rule_body'><p align='justify' style='100%'>"+obj["description"].replace(/<\[singleAmount\]>/g,"<singleAmount>"+obj['singleAmount']+"</singleAmount>").replace(/<\[trxNo\]>/g,"<trxNo>"+obj['trxNo']+"</trxNo>").replace(/<\[idTime\]>/g,"<idTime>"+obj['idTime']+"</idTime>").replace(/<\[totalAmount\]>/g,"<totalAmount>"+obj['totalAmount']+"</totalAmount>").replace(/<\[varation\]>/g,"<varation>"+obj['varation']+"</varation>") +"</p><table>";
		if("trxNo" in obj ) toAppend = toAppend + "<li><h4>"+$.t("Trx No.")+"</h4><input type='tel' field='trxNo' maxlength='10'  placeholder='"+obj["trxNo"]+"'> <span class='icon-pencil'</span></li>";
		if("singleAmount" in obj ) toAppend = toAppend + "<li><h4>"+$.t("Amount")+"</h4><input type='tel' field='singleAmount' maxlength='10'  placeholder='"+obj["singleAmount"]+"'/><span class='icon-pencil'</span></li>";
		if("totalAmount" in obj ) toAppend = toAppend + "<li><h4>"+$.t("Total Amount")+"</h4><input type='tel' field='totalAmount' maxlength='10'  placeholder='"+obj["totalAmount"]+"'/><span class='icon-pencil'</span></li>";
		if("varation" in obj ) toAppend = toAppend + "<li><h4>"+$.t("Variation")+"</h4><input type='tel' field='varation' maxlength='10' placeholder='"+obj["varation"]+"'/></td></tr>";
		if("idTime" in obj ) toAppend = toAppend + "<li><h4>"+$.t("Time")+"</h4><select class='SelectStyle'>"+SPickerString+"</select><span class='icon-pencil'</span></li>";
		toAppend = toAppend + "</ul></div></div> </li>";
		$('#rules .products>ul').append(toAppend);
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


function addRuleChange(idRule,field,value){
	if (!(idRule in  rulesChanges)){
		rulesChanges[idRule] = {"idRule" : idRule}
	}
		rulesChanges[idRule][field] = parseInt(value);
		
		console.log(JSON.stringify(rulesChanges));
}
		

function getValidTimePeriods(){
	$.post('http://'+IP+':8089/appriz/getTimePeriods',{"secretKey" : secretKey},function(data){
		if (data["status"]== 200){
			SPickerString = timePicker(data["periods"]);
		}
		
	},'json') .fail(function(e) {
			//alert("conexion error!");
		//alert( JSON.stringify(e));
	}).done(function(){});
	
}


function processRuleChange(){
	var tmp_ruleChange = [];
	for ( ruleChange in rulesChanges){
		tmp_ruleChange.push(rulesChanges[ruleChange]);
	}
	rulesChanges = {};
	console.log(JSON.stringify(tmp_ruleChange));
	
	$.post('http://'+IP+':8089/appriz/setRulesByProduct',{"idSecretClient": idScretClient,"productName": currentProduct, "rules":tmp_ruleChange},function(data){
			console.log(JSON.stringify(data));
			if (data["status"]== 200){
				SPickerString = timePicker(data["periods"]);
			}
		
	},'json') .fail(function(e) {
		console.log("conexion error!");
		console.log( JSON.stringify(e));
	}).done(function(){});
	
	return tmp_ruleChange;
}
		

$( document ).on("tapend","[page-content=rules]",function(){
		$.ajaxSetup({async:false});
		$("#rules .productNav li").eq(1).find("button").html($(this).find("prd").html());
		getValidTimePeriods()
		getRules($(this).find("prd").html());
		$.ajaxSetup({async:true});
});


$( document ).on('tapend','#rules li h3',function(){
	$(this).parent().find('.dropdownBox').toggle();
});

//change values on rule description
$(document).on('keyup','.rule input[type=tel]',function(){
		$(this).parent().parent().parent().parent().parent().find($(this).attr('field')).html($(this).val());
		addRuleChange($(this).parent().parent().parent().parent().parent().attr('id').replace(/rule_(\S+)/,"$1"),$(this).attr('field'),$(this).val());
		$(this).parent().parent().parent().parent().parent().find('input[type=checkbox]').attr('checked','true');
});


//active rule
$( document ).on('change','input.toggle',function(){
		var rId = $(this).parent().parent().attr('id').replace(/rule_(\S+)/,"$1");
		console.log(rId);
		if($(this).is(":checked")){
			console.log('checked');
			$('.dropdownBox').hide();
			$(this).parent().parent().find(".dropdownBox").show();
			$(this).parent().parent().find('.dropdownBox input').each(function(){
				console.log('table input');
				addRuleChange(rId,$(this).attr('field'),$(this).val() == "" ? $(this).attr("placeholder") : $(this).val());
				
			});
			$(this).parent().parent().find('table option:selected').each(function(){
				addRuleChange(rId,'idTime',$(this).val());
			});

		}else{
			rulesChanges[rId] = {"idRule" : rId} // disable rule
		}
	});