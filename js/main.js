
	var tabSelectedColor 	= "rgb(0, 91, 153)";
	var tabUnSelectedColor 	= "rgb(213, 212, 211)";
	back = [];
	//Main Menu handle
	
	// fix_messages();
	fix_messages();
	// document.addEventListener("deviceready", function() {
		$(".menu-main , .icon-menu").tapend(function(e){
			
			//e.stopPropagation();
			$('.allMenu').css({"width" : "80%" });
			$('#menuAppriz').css({"display" : "block"});
			$('.allMenu').velocity({"right" : "0px" },{ duration: 500 });
		});
		
		$('.bgModal').tapend(function(e){
			$('#menuAppriz').fadeOut(300);
			$('.allMenu').css({"right" : "-80%"});
			
		});
		

		
		
		//Menu Nav
		$.fn.hasAttr = function(name) {  
			return this.attr(name) !== undefined;
		};
		
		$( document ).on("tapend",'.navAppriz li',function(){
			if(	$(this).find("a").hasAttr("menu-page")){
				$($(".navAppriz .active").find("a").attr("menu-page")).hide();
				$(".navAppriz .active").removeClass("active");
				$(this).addClass("active");
				$($(this).find("a").attr("menu-page")).show();
			}
		});
	//});
	
	
	//Page Changer
	$( document ).on("tapend","[page-content]",function(){
		back.push( $(".page-content.active").attr("id"));
		$(".page-content.active").removeClass("active");
		$("header.active").removeClass("active");
		$("#"+$(this).attr("page-content")+".page-content").addClass("active").show();
		$("#"+$("#"+$(this).attr("page-content")+".page-content").attr("header")).addClass("active").show();
		$('#menuAppriz').fadeOut(300);
			$('.allMenu').velocity({"right" : "-80%"});
	});
	//page back
	
	$( document ).on("tapend","a.icon-back",function(){
		var inBack = back.pop();
		if(inBack != "undefined"){
			$(".page-content.active").removeClass("active");
			$("header.active").removeClass("active");
			
			$("#"+inBack).addClass("active").show();
			$("#"+$("#"+inBack).attr("header")).addClass("active").show();
		}
			
	});
	

	
	

