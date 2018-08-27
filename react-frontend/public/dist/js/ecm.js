$(document).ready(function() {
    $('.cip-toggle').click(function(){
       $('form[name=reqForm] > .box-body').each(function(){
            if(!$(this).hasClass('cip')){
                $(this).css("display", "none");
            }
       });
    });
});