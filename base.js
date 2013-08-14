$(function(){
    $(window).load(function(event){
        el = $('.header').first()
        $("<div style='height:"+(el.next().offset().top-parseInt($('p',el.next()).first().css('margin-top')))+"px'>foo bar</div>").insertAfter(el)
        el.first().addClass('fixed');
    });

    var lastScrollTop = 0;
    $(window).scroll(function(event){
        var currentScrollTop = $(this).scrollTop();
        if (currentScrollTop > lastScrollTop){
            console.log('scrolling down');
            $('.header').each(function(){
                if($(this).hasClass('fixed'))
                {
                    var _next_header = $(this).nextUntil('.header').next('.header');
                    console.log("_next_header", _next_header);
                    //debugger;
                    if($(_next_header).length > 0)
                    {
                        console.log($(_next_header).offset().top, "<", $('body').scrollTop())
                        if($(_next_header).offset().top < $('body').scrollTop())
                        {
                            // Bottom of header hit top of next header
                            $(this).removeClass('fixed').addClass('relative');
                            $(_next_header).removeClass('relative').addClass('fixed');
                        }
                    }
                }
            }); 
        } 
        else 
        {
           console.log('scrolling up');
            // Scrolling up
            $('.header').each(function(){
                if($(this).hasClass('fixed'))
                { 
                    var _prev_header = $(this).prevUntil('.header').prev('.header');
                    if($(_prev_header ).length > 0)
                    {
                        //if($(this).offset().top <= ($('#' + $(_prev_header).attr('id') + '_content').offset().top + $(this).height()))
                        console.log($(_prev_header).offset().top, "<", $('body').scrollTop())
                        if($('.fixed').next().offset().top >= $('body').scrollTop()+(2*$('.fixed').height()))
                        {
                            // Top of header hit bottom of previous content box
                            $(this).removeClass('fixed').addClass('relative');
                            $(_prev_header).removeClass('relative').addClass('fixed');
                        }
                    }
                }
            }); 
        }
        lastScrollTop = currentScrollTop;
    });
});
