$(function(){
    var el = $('.header').first();
    var top_margin = parseInt($('p',el.next()).first().css('margin-top'))
    var lastScrollTop = 0;
    $("<div style='height:"+(el.next().offset().top-top_margin)+"px'>foo bar</div>").insertAfter(el)
    el.first().addClass('fixed');

    $(window).scroll(function(event){
        var currentScrollTop = $(this).scrollTop();
        $('.header').each(function(){
            if($(this).hasClass('fixed')){
                if (currentScrollTop > lastScrollTop){
                    console.log('scrolling down');
                    var _next_header = $(this).nextUntil('.header').next('.header');
                    if($(_next_header).length > 0){
                        if($('body').scrollTop() > $(_next_header).offset().top){
                            // Bottom of header hit top of next header
                            $(this).removeClass('fixed').addClass('relative');
                            $(_next_header).removeClass('relative').addClass('fixed');
                        }
                    }
                } else {
                    console.log('scrolling up');
                    var _prev_header = $(this).prevUntil('.header').prev('.header');
                    if($(_prev_header ).length > 0){
                        if($('body').scrollTop() < $('.fixed').next().offset().top-2*($('.fixed').height()-2*top_margin+1)){
                            // Top of header hit bottom of previous content box
                            $(this).removeClass('fixed').addClass('relative');
                            $(_prev_header).removeClass('relative').addClass('fixed');
                        }
                    }
                }
            }
        }); 
        lastScrollTop = currentScrollTop;
    });
});
