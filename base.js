// From: http://jsfiddle.net/AlienWebguy/mvtP7/1/ via: http://stackoverflow.com/questions/6720847
$(function(){
    var lastScrollTop = 0;
    // When the first header is given a fixed position, the inline content that follows with shift up.
    el = $('.header').first();
    // To over come this: clone it, make it invisible, remove id tags from it and its children, attach it before the original
    el.before(el.clone(false).css({'visibility':'hidden'}).removeAttr("id").find("*").removeAttr("id").end()).addClass('fixed');

    $(window).scroll(function(event){
        var currentScrollTop = $(this).scrollTop();
        $('.header').each(function(){
            if($(this).hasClass('fixed')){
                if (currentScrollTop > lastScrollTop){
                    console.log('scrolling down');
                    var _next_header = $(this).nextUntil('.header').next('.header');
                    if($(_next_header).length > 0){
                        if($('body').scrollTop() > $(_next_header).offset().top){
                            console.log("Bottom of header hit top of next header")
                            $(this).removeClass('fixed');
                            $(_next_header).addClass('fixed');
                        }
                    }
                } else {
                    console.log('scrolling up');
                    var _prev_header = $(this).prevUntil('.header').prev('.header');
                    if($(_prev_header ).length > 0){
                        if($('body').scrollTop() < $('.fixed').next().offset().top-$('.fixed').height()){
                            console.log("Top of header hit bottom of previous content box")
                            $(this).removeClass('fixed');
                            $(_prev_header).addClass('fixed');
                        }
                    }
                }
            }
        }); 
        lastScrollTop = currentScrollTop;
    });
});
