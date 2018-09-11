$(document).ready(function() {
    $('.cip-toggle').click(function(){
        sectionToggle(this,'cip');
    });

    $('.proxyrr-toggle').click(function(){
        sectionToggle(this,'proxyrr');
    });

    $('.remediation-toggle').click(function(){
        sectionToggle(this,'remediation');
    });
});

var sectionToggle = function(target, className){
    $('.case-menu li').removeClass('active');
    $(target).parent().addClass('active');
    $('form[name=reqForm] > .box-body').each(function(){
            if(!$(this).hasClass(className)){
                $(this).css("display", "none");
            } else{
            $(this).css("display", "block"); 
        }
    });
}