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

    $('.related-parties-toggle').click(function(){
        sectionToggle(this,'related-parties');
    });

    if(window.location.href.indexOf("#proxyrr") != -1){
        sectionToggle($('.proxyrr-toggle'),'proxyrr');
    } else if(window.location.href.indexOf("#cip") != -1) {
        sectionToggle($('.cip-toggle'),'cip');
    } else if(window.location.href.indexOf("#remediation") != -1) {
        sectionToggle($('.remediation-toggle'),'remediation');
    } else if(window.location.href.indexOf("#related-parties") != -1) {
        sectionToggle($('.related-parties-toggle'),'related-parties');
    } else{
        sectionToggle($('.proxyrr-toggle'),'proxyrr');
    }
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