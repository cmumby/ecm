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

    $('.screening-toggle').click(function(){
        sectionToggle(this,'screening');
    });

    $('.documentation-toggle').click(function(){
        sectionToggle(this,'documentation');
    });

    $('.transportation-sarf-toggle').click(function(){
        sectionToggle(this,'transportation-sarf');
    });

    $('.hraedd-toggle').click(function(){
        sectionToggle(this,'hraedd');
    });

    $('.qc-checklist-toggle').click(function(){
        sectionToggle(this,'qc-checklist');
    });

    $('.ous-entity-toggle').click(function(){
        sectionToggle(this,'ous-entity');
    });

    if(window.location.href.indexOf("#proxyrr") != -1){
        sectionToggle($('.proxyrr-toggle'),'proxyrr');
    } else if(window.location.href.indexOf("#cip") != -1) {
        sectionToggle($('.cip-toggle'),'cip');
    } else if(window.location.href.indexOf("#remediation") != -1) {
        sectionToggle($('.remediation-toggle'),'remediation');
    } else if(window.location.href.indexOf("#related-parties") != -1) {
        sectionToggle($('.related-parties-toggle'),'related-parties');
    } else if(window.location.href.indexOf("#screening") != -1) {
        sectionToggle($('.screening'),'screening');
    } else if(window.location.href.indexOf("#documentation") != -1) {
        sectionToggle($('.documentation'),'documentation');
    } else if(window.location.href.indexOf("#transportation-sarf") != -1) {
        sectionToggle($('.transportation-sarf'),'transportation-sarf');
    } else if(window.location.href.indexOf("#hraedd") != -1) {
        sectionToggle($('.hraedd'),'hraedd');
    } else if(window.location.href.indexOf("#qc-checklist") != -1) {
        sectionToggle($('.qc-checklist'),'qc-checklist');
    } else if(window.location.href.indexOf("#ous-entity") != -1) {
        sectionToggle($('.ous-entity'),'ous-entity');
    }else{
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