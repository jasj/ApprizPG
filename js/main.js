(function($) {
    $(".icon-menu").click(function(e){
        e.stopPropagation();
        var div = $("#menuAppriz").fadeIn(300);
        div.css({
            "display": "block"
        });
    });
    $(document).click(function(e){
        $('#menuAppriz').fadeOut(300);
    });
})(jQuery);





