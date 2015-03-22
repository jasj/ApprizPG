

function showMessage(id){
	//Indicate tback page
	back.push( "inbox" );
	//Message Handle
	var msg = $("#"+id+".Message");
	//make it readed 
	msg.removeClass('unread');
	//Update the unread  Messages conter
	counterByMsg();
	//report message state
	reportMsgState();
	//select the dotState
	var dotState =  msg.attr("bulb") == 1   ? 'dotDone' : msg.attr("bulb") == 2   ? 'dotProgress' : msg.attr("bulb") == 3   ? 'dotError' :  'dotNone';
	//Change the detail div with the info of the msg					
	$('.detail_fixed h6').html('<span class="icon-primitive-dot dotInactive '+dotState+'"></span>'+msg.find("date").html());
	$(".details_ h3").html(msg.find(".details h3").html());
	//make the previus page inactive
	$(".page-content.active").removeClass("active");
	//Show details page
	$("#MessageDetail.page-content").addClass("active").show();
	//Begin a safe path if services doesnt exist 
	try{
		//convert service attribute to original request format
		var array_serv = JSON.parse(atob(msg.attr('services')));
		//Create a variable to handle li
		var management = "";
		//go thru all services and append to the li handle string
		for(serv in  array_serv){
			management = management +"<li msg='"+msg.attr('id')+"' services='"+serv+"'> <button class='oneOption'>"+array_serv[serv]+"</button></li>";
		}
		//Add the li handle string to the DropDown Option Unorder List
		$('.dropdownOption ul').html(management);
		//Show the option button
		$('#showOptions').show();	
	}catch(e){
			 //If fails means that there are not any options, so hide the option btn.
			 $('#showOptions').hide();
	}
	//Begin a safe path if appends doesnt exist 
	try{
		//convert appends attribute to original request format
		var array_appends = JSON.parse(atob(msg.attr('appends')));
		//Create a variable to handle li
		var strAppends = "";
		//go thru all appends and append to the li handle string
		$.each(array_appends,function(key,value){
			//Create the append's block
			var tags 	= "<h4>ID</h4>";
			var values 	= "<p>"+value["id"]+"</p>";
			
			$.each(value["fields"],function(key2,value2){
				
				switch(value2["type"]){
					case "float":
						values += "<p>"+value2["value"]+"</p>";
					break;
					
					case "date":
						values += "<p>"+value2["value"]+"</p>";
					break;
					
					default:
						values += "<p>"+value2["value"]+"</p>";
					break;
				}
				
				tags 	+= "<h4>"+value2["tag"]+"</h4>";
			});
			
			strAppends = strAppends + '<div class="detailsList"><div class="row">'+tags+'</div><div class="row">'+values+'</div></div>';
			
		});
		}
		catch(e){$('div[view=trx_view]').hide();}
		$('.appends').html(strAppends);
	
	//Calculate and fix the height of the option menu based on the number of options
	$('.dropdownOption').css({'bottom': (-$('.dropdownOption').height()-50)+"px"});
	//Bring appends to the front
	$(".appends").css({"z-index": 40});
	
	//Choose the entity header 
	$("header.active").removeClass("active");
	$("#headerEntity").addClass("active");
		
}

$( document ).on('tapend','.optionBtn',function(){
	
	if($('.dropdownOption').css("bottom") == "50px"){
	//	alert($('.dropdownOption').height() );
		$('.dropdownOption').velocity({'bottom': (-$('.dropdownOption').height()-50)+"px"});
		$(".appends").css({"z-index": 40});
	}
	else{
		$(".appends").css({"z-index": 0});
		$('.dropdownOption').velocity({'bottom' : '50px'});
	}
});