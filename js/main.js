
	var tabSelectedColor 	= "rgb(0, 91, 153)";
	var tabUnSelectedColor 	= "rgb(213, 212, 211)";
	//Main Menu handle
	
	// fix_messages();
	fix_messages();
	// document.addEventListener("deviceready", function() {
		$(".menu-main").tapend(function(e){
			
			//e.stopPropagation();
			$('.allMenu').css({"width" : "80%" });
			$('#menuAppriz').css({"display" : "block"});
			$('.allMenu').velocity({"right" : "0px" },{ duration: 500 });
		});
		
		$('.bgModal').tapend(function(e){
			$('#menuAppriz').fadeOut(300);
			$('.allMenu').css({"right" : "-80%"});
			
		});
		
		//MSG Swipped 
		$( document ).on("swipe", ".Message" ,function(a,b,c){
			
			
			var mContainer = $(this).find(".moveContainer");
			var actualMargin = parseInt(mContainer.css("margin-left").replace(/[^-\d\.]/g, '') );
				console.log(JSON.stringify(b));
		
		//This will be for show the delete button 
		if(b["startEvnt"]["position"]["x"] > b["endEvnt"]["position"]["x"]){
			//alert(parseInt(mContainer.css("margin-left").replace(/[^-\d\.]/g, '') ));
			if( actualMargin <10){
				if(b["xAmount"] > 150){
						mContainer.css({"margin-left" : "-150px"});
				}else{
							mContainer.css({"margin-left" : (b["xAmount"]*-1)+"px"});
				}
			}
			else{
					alert("aqui");
					mContainer.css({"margin-left" : window.innerWidth + (b["xAmount"]*-1)+"px"});
				
			}
		}
		//This could be to show the detail or hide the delete button
		else{
			
				mContainer.css({"margin-left" : b["xAmount"]+"px","overflow-x" :"visible"});
			
		}
		});
		
		$( document ).on("swipeend", ".Message" ,function(a,b,c){
			var mContainer = $(this).find(".moveContainer");
			if(b["startEvnt"]["position"]["x"] > b["endEvnt"]["position"]["x"]){
				if(b["xAmount"] < 151 &&  1){
					mContainer.velocity({"margin-left" : "0px"});
				}
			}
			else{
				if(b["xAmount"] > 150){
					
					mContainer.velocity({"margin-left" : window.innerWidth+"px"},{ duration: 500 });
				}else{
					mContainer.velocity({"margin-left" : "0px"});
				}
			}
		});
		
		
		//Filter handle
		
		$( document ).on("tapend",'nav.categoryNav span',function(){
			if( $(this).css("color") == tabSelectedColor){
				$(this).css({content: "\e60b",color: tabUnSelectedColor});
				$(this).find('.path1::before').css({color: tabUnSelectedColor});
			
			}else{
				$(this).css({content: "\e60b",color: tabSelectedColor});
				$(this).find('.path1').css({color: tabSelectedColor});
			}
		});
		
		$( document ).on("taphold",'nav.categoryNav span',function(){
			$('nav.categoryNav span').css({content: "\e60b",color: tabUnSelectedColor});
			$(this).find('.path1::before').css({color: tabUnSelectedColor});
			//$(this).css({content: "\e60b",color: tabSelectedColor});
		});
		
		
		
		//Menu Nav
		
		$( document ).on("tapend",'.navAppriz li',function(){
			$($(".navAppriz .active").find("a").attr("menu-page")).hide();
			$(".navAppriz .active").removeClass("active");
			$(this).addClass("active");
			$($(this).find("a").attr("menu-page")).show();
		});
	//});
	





/*
{	"startEvnt":{"position":{"x":538,"y":341},"offset":{"x":441,"y":228},"time":1425930563806,"target":{}}
,"endEvnt":{"position":{"x":481,"y":336},"offset":{"x":384,"y":223},"time":1425930563917,"target":{}},"direction":"left","xAmount":57,"yAmount":5,"duration":111}*/