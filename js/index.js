//header scroll effect
$(window).scroll(function() {
    if (window.scrollY >= 10) {
        $('.header').css('background-color', '#ebebeb');
        $('.header a, .header ion-icon').css('color', '#000');
    } else {
        $('.header').css('background-color', 'transparent');
        $('.header a, .header ion-icon').css('color', '#fff')
    }
});

//header hover effect
$('.header').hover(
    function() {
        $(this).css('background-color', '#ebebeb');
        $(this).find('a, ion-icon').css('color', '#000');
},
    function() {
        $(this).css('background-color', 'transparent');
        $(this).find('a, ion-icon').css('color', '#fff');
});

//mega
let timer;

$('.has_mega').hover(
    function() {
        clearTimeout(timer);
        $('.mega_content').show('slow');
    },
    function() {
        timer = setTimeout(function() {
            if (!$('.mega_content').is(':hover')) {
                $('.mega_content').hide(200);
            }
        }, 300);
    }
);

// search input
$('.nav_search').click(function() {
    $('.secondary_nav').toggle('slow');
});

// loop vid 
var bgVideo = document.getElementById("main_video");
    bgVideo.addEventListener("ended", function() {
    setTimeout(function() {
        bgVideo.currentTime = 0;
        bgVideo.play();
    }, 1500);
});

// splide
document.addEventListener( 'DOMContentLoaded', function () {
    var splide = new Splide( '#image_carousel' , {
        type: 'loop',
        rewind: 'true',
        autoplay: true,
        drag   : 'free',
        snap   : true,
        perPage: 1
    })
    splide.mount()
} );


    // Lấy đối tượng dropdown và nút kích hoạt dropdown
    var dropdown = $('#my-dropdown');
    var dropdownButton = dropdown.find('.dropdown-toggle');

    // Thêm sự kiện hover vào và hover ra khỏi nút kích hoạt dropdown
    dropdownButton.hover(function() {
      dropdown.addClass('show');
      dropdownButton.attr('aria-expanded', 'true');
    }, function() {
      dropdown.removeClass('show');
      dropdownButton.attr('aria-expanded', 'false');
    });