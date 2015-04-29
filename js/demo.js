$("#demo button").tapend(function(){
	alert("demo");
	$.ajax("https://cloud.apprizservice.com/MessagingRT/Messages/procesarGestion", {
	type : "PUT",
	data : {
			"idMensaje" : 0,
			"encabezado" : "encabezado",
			"estadoMensaje": "No Leido",
			"nombreEntidad": "ABC Bank",
			"identity":{
			   "userName" : "",
			   "computer" : "-",
			   "ipAddress": "-"
			},
			"identificacion": "CMT0028",
			"lenguajeStr": "en",
			"gestiones" : {
				"nombreCodigo":"DEMO-en",
				"descripcion":"en",
				"tipo":"Demo"
			},
			"tieneFechaRecordatorio": false,
			"descripcion" : "DEMO",
			"idParent" : -1,
			"producto" : "My Debit Card-5412",
			"lenguajeMensaje" : "en",
			"esGestion" : true
		},
	contentType : "application/json",
	success : function() {
			showInfoD($.t('Demo Request'),$.t('Yo will recive messages very soon'),function(){$('.moldHide, .dialogAlert').hide();});
		
	}}
);
});