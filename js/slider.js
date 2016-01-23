var Slider = {}

jQuery(function($) {
    $('#home #main-block').mouseover(function() {
        // console.log('mouseover')
        Slider.apStop();
    });
    $('#home #main-block').mouseout(function() {
        // console.log('mouseout')
        Slider.apStart();
    });
    sub();
    (Slider.mSliderInit = function() {
        Slider.mSlider = $("#main-slider-block").bxSlider({
            pagerCustom: '.tabs',
            controls: false,
            infiniteLoop: true,
            hideControlOnEnd: true,
            // mode: "fade",
            onSlideBefore: function(obj, currSlide, nextSlide) {
                $('.sliders').removeClass('active')
                obj.addClass('active')
                obj.find('.slide:first-child').addClass('active')
                var indexImg = obj.find('.slide:first-child .inner').attr('index-img')
                $('.img-bg').addClass('animated fadeIn').find('img').attr('src', indexImg)
                if(obj.find('.slide:first-child .inner').hasClass('dark')) {
                  $('.section').removeClass('white-block')
                }
                else {
                     $('.section').addClass('white-block')
                }
                // Slider.apStop();
                setTimeout(function() {
                    Slider.subSliders[nextSlide].goToSlide(0);
                }, 10);
            },
            onSlideAfter: function(obj, currSlide, nextSlide) {
                // Slider.apStart();
                $('.img-bg').removeClass('fadeIn')
            }
        });
    })();
    Slider.apSpeed = 3000;
    Slider.apStart = function() {
        clearTimeout(Slider.apE);
        Slider.apE = setTimeout(function() {
            Slider.moveCtrl(1);
        }, Slider.apSpeed);
    };

    Slider.apStop = function() {
        clearTimeout(Slider.apE);
    };
    Slider.moveCtrl = function(p, currSlide) {
        var currentSub = Slider.subSliders[Slider.mSlider.getCurrentSlide()];
        if (p < 0 && currentSub.getCurrentSlide() === 0) {
            Slider.mSlider.goToPrevSlide();
            navSliderThumb()
        } else if (p > 0 && currentSub.getCurrentSlide() === currentSub.getSlideCount() - 1) {
            Slider.mSlider.goToNextSlide();
            navSliderThumb()
        } else {
            p < 0 ? currentSub.goToPrevSlide() : currentSub.goToNextSlide();
            navSliderThumb()
        }
    }
    // mouse move screen

    $("body").on('mousemove', function(e) {
        if ((e.pageX - this.offsetLeft) < $(this).width() / 2) {
            $(".prev-block").addClass("show")
            $(".next-block").removeClass("show")
        } else {
            $(".next-block").addClass("show")
            $(".prev-block").removeClass("show")
        }
    })
    $(document).on("click", "#main-block .prev-block > div a", function(e) {
        e.preventDefault();
        Slider.moveCtrl(-1);
        activeSlider()
    })
        .on("click", "#main-block .next-block > div a", function(e) {
            e.preventDefault();
            Slider.moveCtrl(1);
            activeSlider()
        })
        activeSlider()

    $('#main-block .nav-block > div a').hover(function() {
        navSliderThumb()
        }, function(){

    })
})

function navSliderThumb() {
    var $prev = $('#slider-prev').next().find('img')
    var $next = $('#slider-next').next().find('img')
    var $prevTh = $('.slide.active .inner').attr('index-prev')
    var $nextTh = $('.slide.active .inner').attr('index-next')
    $prev.attr('src', $prevTh)
    $next.attr('src', $nextTh)
}

function activeSlider() {
    $('.sliders.active').each(function(){
        var $slidersActive = $(this)
        $subSlidersActive = $slidersActive.find('.bx-wrapper .slide.active .inner')
        console.log($subSlidersActive)
        if($subSlidersActive.hasClass("dark")) {
            $('.section').removeClass('white-block')
        }
        else {
            $('.section').addClass('white-block')
        }
    })

}


function sub() {

    var boxes = $("#main-slider-block > div");

    Slider.subSliders = [];

    for (var i = 0, c = boxes.length; i < c; i++) {
        Slider.subSliders[i] = boxes.eq(i).find('.bxslider').bxSlider({
            controls: false,
            speed: 3000,
            infiniteLoop: false,
            onSlideBefore: function(currSlide) {
                // Slider.apStop();
                var indexImg = currSlide.find('.inner').attr('index-img')
                $('.img-bg').addClass('animated fadeIn').find('img').attr('src', indexImg)
                if (currSlide.find('.inner').hasClass('dark')) {
                    $('.section').removeClass('white-block')
                } else {
                    $('.section').addClass('white-block')
                }
                $('.slide').removeClass('active')
                currSlide.addClass('active')
                // console.log(indexImg)
            },
            onSlideAfter: function(currSlide) {
                Slider.apStart();
                $('.img-bg').removeClass('fadeIn')

            }
        });
    }

}