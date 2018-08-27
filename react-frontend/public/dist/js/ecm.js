$(document).ready(function() {
    $('.cip-toggle').click(function(){
        
        $('.case-menu li').removeClass('active');
        $(this).parent().addClass('active');
        $('form[name=reqForm] > .box-body').each(function(){
            if(!$(this).hasClass('cip')){
                $(this).css("display", "none");
            } else{
                $(this).css("display", "block"); 
            }
        });
    });

    $('.proxyrr-toggle').click(function(){
        $('.case-menu li').removeClass('active');
        $(this).parent().addClass('active');
        $('form[name=reqForm] > .box-body').each(function(){
             if(!$(this).hasClass('proxyrr')){
                 $(this).css("display", "none");
             } else{
                $(this).css("display", "block"); 
            }
        });
     });
});