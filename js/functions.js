var slider_array = new Array();

var MD = {};



jQuery(function($) {
    if($(".pagination").length) {
        //$(".pagination").mCustomScrollbar({
        //    setHeight:529,
        //    theme:"dark-thin"
        //});

        $(document).on('click', '.pagination .page', function (e) {
            var imgNum = $('.pagination .page').index(this);

            $('.slides_container img').hide();
            $('.slides_container img').eq(imgNum).show();

            return false;
        })
    }

    jQuery(function()
    {
        jQuery('.pagination').jScrollPane();
    });



    $(document).ready(function() {
        $("#products .pagination li").click(function ( e ) {
            e.preventDefault();
            $("#products .pagination li.active").removeClass("active");
            $(this).addClass("active");
        });
        $('img').each(function () {
            w = $(this).width();
            h = $(this).height();
            if (w < h) {
                $(this).css("width", "100%");
            }
            else {
                $(this).css("height", "100%");
    }
});
    });



    columnSize()
    // click event main page
    var toggle = 1;
    var $catlink = $("#cat");
    $(document).on("click", "#search>span ", function() {
        $("#search-block").animate({
            height: 54
        }, 300);
        $(this).addClass("active");
        return false;
    })
        .on("click", "#search-block .close", function() {
            $(this).parent().parent('#search-block').animate({
                height: 0
            }, 300);
            $("#search>span").removeClass("active");
            return false;
        })
        .on("click", "#main-nav>span", function() {
            $("#sub-nav").animate({
                top: 73
            }, 300);
            $(this).animate({
                left: "-100%"
            }, function() {
                $(this).next().animate({
                    right: 0
                }, 300)
            })
            $(this).parent().addClass("active")
            return false;
        })
        .on("click", "#main-nav>.close, #main-nav .close", function() {
            $("#sub-nav").animate({
                top: 0
            }, 300)
            $(this).animate({
                right: "-100%"
            }, function() {
                $(this).prev().animate({
                    left: 0
                }, 300)
            })
            $(this).parent().removeClass("active")
            $("#nav-cataloge").animate({
                top: "-1000%"
            }, 300)
            toggle = 1;
            return false;
        })
        .on("click", "#cat, #nav-cataloge .close", function() {
            if (toggle) {
                $("#nav-cataloge").animate({
                    top: 128
                }, 300)
                $catlink.addClass("active")
                toggle = 0;
                fadeCtrl(true);
            } else {
                $("#nav-cataloge").animate({
                    top: "-1000%"
                }, 300)
                toggle = 1;
                $catlink.removeClass("active")
                fadeCtrl(false);
            }
            return false;
        })
        .on("click", "#cat-nav ul li a", function() {
            $("#cat-nav ul li").removeClass("active");
            $(this).parent().addClass("active");
            return false;
        })
        .on("click", "#filter>div>a.fl-click", function(e) {
            e.preventDefault();
            $(this).next().toggle();
            $(this).parent().toggleClass("active");
            return false
        })

    $(document).click(function (e) {
            if ($(e.target).hasClass('active') != true) {
                $('.fl-show').hide().parent().removeClass('active');
            }
        })



    .on("click", ".offer", function() {
            $("#filter ul input[type=checkbox]").iCheck('uncheck');
            $("#filter .all").removeClass("active")
            return false
        })

    .on("click", "#filter .all", function() {
            $(this).toggleClass("active")
            var $inputCh = $(this).parent().parent().find("li input[type=checkbox]")
            if ($(this).is(".active")) {
                $inputCh.iCheck('check')
            } else {
                $inputCh.iCheck('uncheck')
            }
            return false
        })
        .on('ifUnchecked', '#filter ul li input[type=checkbox]', function(event) {
            var $parentCh = $(this).parent().parent().parent()
            $parentCh.find("li a").removeClass("active")
        })

        .on("click", "body.mobile #cat-nav .select-area,body.tablet #cat-nav .select-area", function() {
            $(this).parent().toggleClass("open");
        })


    //////////// each //////////

    $(".info-section #tabs").each(function() {
        $(this).find("li a, li span").each(function(i) {
            $(this).click(function() {
                $(this).parent().addClass("active").siblings().removeClass("active")
                    .parents(".info-section").find("div.box").eq(i).fadeIn(300).siblings("div.box").hide();
                hrono()
            });
        });
    });
    //  form style
    $('input[type=checkbox]').iCheck()
    $("select").chosen({
        disable_search_threshold: 10,
        no_results_text: "Oops, nothing found!",
        width: "100%"
    })

    // carousel and sliders
    // slider



    // carousel
    $carousel = $("#carousel .inner ul").bxSlider({
        pager: false,
        slideWidth: 210,
        minSlides: 5,
        maxSlides: 5,
        slideMargin: 25,
        // nextSelector: '#bx-next',
        // prevSelector: '#bx-prev',
        // nextText: '',
        // prevText: '',
        infiniteLoop: false
    })
    // $brands = $("#brands ul").bxSlider({
    //     controls: false,
    //     pagerCustom: '#carousel',
    //     infiniteLoop: false

    // })

    $(".brands-carousel").each(function() {
        $(this).find("li").each(function(i) {
          $(this).find('a').click(function(){
                  $(this).addClass("active").siblings().removeClass("active")
                  $("#brands ul").find("li.box").eq(i).fadeIn().addClass('animated fadeInLeft').siblings("li.box").hide();
            });
        });
    });


    bHeight()
    if ($(".box").css('display') == "block") {
        $(this).find(".fade").hrono()
    } else {
        $(".fade").fadeOut()
    }
    if ($("div").is("#carousel")) {
        checkMq()
    }


    MD.resT;
    MD.resW = $(window).width();
    $(window).resize(function() {

        if ($(window).width() !== MD.resW) {
            clearTimeout(MD.resT);
            MD.resT = setTimeout(function() {
                MD.resW = $(window).width();
                resizeAction();
            }, 200);
        } else {
            resizeAction();
        }
    });

    function resizeAction() {
        sizeCtrl();
        if ($("div").is("#carousel")) {
            checkMq()
        }
        bHeight();
    }
    // popup
    $(".popup-link").colorbox({
        transition: "fade",
        speed: 0,
        inline: true
    })

    // $(window).resize()

    ///////////////////////////////////

    var $container = $(".infinite-container");
    $container.infinitescroll({
            navSelector: '#page-nav', // селектор контейнера для навигации по старинцам
            nextSelector: '#page-nav a', // селектор для навигации
            itemSelector: '.infinite-item', // селектор блоков, к которым применяются эффекты
            donetext: 'Больше нет страниц для загрузки',
            debug: false, // выводит ошибки на консоль
            errorCallback: function() {
                $('#infscr-loading').animate({
                    opacity: .8
                }, 2000).fadeOut('normal');
            }
        },
        function() {
            columnSize($(window).width());
        });

    ///////////////////////////////////

    //////////////////////////

    MD.pre = {};
    MD.pre.main = $("#preloader");
    MD.pre.animEl = MD.pre.main.find("div span");
    MD.pre.images = $("img").on("load", function() {
        MD.pre.eachTick();
    });
    MD.pre.imgC = MD.pre.images.length;
    MD.pre.onePerc = 100 / MD.pre.imgC;
    MD.pre.onePercATime = 100;
    MD.pre.imgLoadedCount = 0;
    MD.pre.timers = [];
    MD.pre.eachTick = function() {
        MD.pre.imgLoadedCount++;
        var l = MD.pre.imgLoadedCount;
        MD.pre.timers.push(setTimeout(function() {
            MD.pre.animEl.animate({
                "width": (MD.pre.onePerc * l) + "%"
            }, MD.pre.onePercATime, "linear");
        }, (MD.pre.onePercATime * l)));
    };
    MD.pre.end = function() {
        for (var t in MD.pre.timers) {
            clearTimeout(MD.pre.timers[t]);
        }

        MD.pre.animEl.animate({
            "width": "100%"
        }, 400, "linear", function() {

            $("#preloader div").fadeOut(0, function() {
                $("#preloader, #pre-bottom").animate({
                    height: 0
                }, 500, function() {
                    Slider.apStart();
                }).fadeOut()
                $("body").delay(350).css({
                    'overflow': 'auto'
                })
            });

        });
    }

    //////////////////////////
    $(window).load(function() {
        MD.pre.end();
    });
});


// functions


function hrono() {
    $(".box").each(function() {
        $.fn.fade = function(ops) {
            var $elem = this;
            var res = $.extend({
                delay: 600,
                speed: 500
            }, ops);
            for (var i = 0, pause = 0, l = $elem.length; i < l; i++, pause += res.delay) {
                $elem.eq(i).delay(pause).fadeIn(res.speed);
            }
            return $elem;
        };
        $(this).find('.fade').fade();
        $(".line-year").animate({
            "height": "100%"
        }, 4800)
    })
}

// preloader
function pre() {
    $("#preloader div span").animate({
        width: "100%"
    }, 2000, function() {

    });
}

function bHeight() {
    var bHeight = $("#left").parent().height()
    $("#left").css({
        "height": bHeight
    })
    $("#rightSide").css({
        "height": bHeight
    })
}

function checkMq() {
    var $window = $(window)
    var $inner = $("#carousel .inner")
    if ($window.width() < 1265 && $window.width() > 980) {
        $carousel.reloadSlider({
            pager: false,
            slideWidth: 153,
            minSlides: 5,
            maxSlides: 5,
            slideMargin: 25,
            infiniteLoop: false
        });
        $("body").removeClass("tablet");
    } else if ($window.width() < 980) {
        $carousel.reloadSlider({
            pager: false,
            slideWidth: 153,
            minSlides: 4,
            maxSlides: 4,
            slideMargin: 8,
            // nextSelector: '#bx-next',
            // prevSelector: '#bx-prev',
            // nextText: '',
            // prevText: '',
            infiniteLoop: false
        });
        $("body").addClass("tablet");
    } else {
        $carousel.reloadSlider({
            pager: false,
            slideWidth: 210,
            minSlides: 5,
            maxSlides: 5,
            slideMargin: 25,
            // nextSelector: '#bx-next',
            // prevSelector: '#bx-prev',
            // nextText: '',
            // prevText: '',
            infiniteLoop: false
        });
        $("body").removeClass("tablet");
    }
}

function sizeCtrl() {
    var wW = $(window).width();
    var body = $("body");
    if (wW <= 480) {
        body.removeClass("tablet")
        body.addClass("mobile");
    } else if (wW <= 980 && wW > 480) {
        body.removeClass("mobile")
        body.addClass("tablet");
    } else {
        body.removeClass("tablet").removeClass("mobile");
    }

    columnSize(wW);
}

function columnSize(w) {
    $("#cataloge li, #filter > div").each(function(index) {
        var a = w < 981 ? 3 : 4;
        $(this).attr("style", "");
        if ((a === 4 ? index + 1 : index) % a == 0 && index !== 0) {
            $(this).css('margin-right', '0')
        }

        index += 1;
    });
}

function fadeCtrl(p) {
    var fade = $("#fade");
    if (p) {
        if (!fade.length) {
            fade = $("<div id='fade'></div>");
            $("body").append(fade);
        }
        fade.fadeTo(300, 0.7);
    } else {
        fade.fadeOut(300);
    }
}