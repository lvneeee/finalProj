$(document).ready(function() {
    const header = $('.header');
    const links = $('.header a, .header ion-icon');
    const input = $('#search_bar');
    var headerState = localStorage.getItem('headerState');
    var isInputFocused = false;

    // Kiểm tra localStorage để giữ trạng thái của .header và .text_dark
    if (localStorage.getItem('headerState') === 'bg_light') {
        header.addClass('bg_light');
        links.addClass('text_dark');
    }

    // header hover effect
    header.hover(
        function() {
            $(this).addClass('bg_light');
            links.addClass('text_dark');
        },
        function() {
            if (!isInputFocused) {
                header.removeClass('bg_light');
                links.removeClass('text_dark');
            }
        }
    );
    header.mouseout(function() {
        if (headerState === 'bg_light') {
            header.addClass('bg_light');
            links.addClass('text_dark');
        }
    });

    // header scroll effect
    $(window).scroll(function() {
        if (window.scrollY >= 10) {
            header.addClass('bg_light');
            links.addClass('text_dark');
            // Lưu trạng thái của .header vào localStorage
            localStorage.setItem('headerState', 'bg_light');
        } else {
            header.removeClass('bg_light');
            links.removeClass('text_dark');
             // Xóa trạng thái của .header khỏi localStorage
            localStorage.removeItem('headerState');
        }
    });

    // handle khung tìm kiếm 
    $('.nav_search').click(function() {
        if ($('.secondary_nav').is(':visible')) {
            $('.secondary_nav').hide('slow');
            if (window.scrollY >= 10) {
                header.addClass('bg_light');
                links.addClass('text_dark');
                localStorage.setItem('headerState', 'bg_light');
        } else {
            header.removeClass('bg_light');
            links.removeClass('text_dark');
            localStorage.removeItem('headerState');
        }
        } else {
            $('.secondary_nav').show('slow');
            input.focus();
            isInputFocused = true;
        }
    });

    //! hàm xử lí menu

    // loop vid 
    var bgVideo = document.getElementById("main_video");
    bgVideo.addEventListener("ended", function() {
    setTimeout(function() {
        bgVideo.currentTime = 0;
        bgVideo.play();
    }, 1500);
    });

    // parallax .section_1
    $(document).on('scroll', function() {
        const scrollTop = $(this).scrollTop();
        const parallax = $('.parallax');
        parallax.css('transform', `translateY(${scrollTop * 0.5}px)`);
    });

    // animate section_2
    const micht = document.getElementById('brand_animation');
    let lines = [
        'MICHT', 'Extreme Generation'
    ]
    let i = 0, j = 0, wait = 6;
    setInterval(() => {
        if(wait-- > 0) return;
        if(wait == -1) {
            micht.innerHTML = '';
        };
        if(i < lines.length) {
            if(j < lines[i].length) {
                micht.innerHTML += lines[i][j++];
            } else {
                wait = 8, j = 0, i++;
            }
        } else {
            wait = 8, j = 0, i = 0;
        }
    },200)

    // splide
    var splide = new Splide('#image_carousel', {
        type: 'loop',
        rewind: true,
        autoplay: true,
        focus: 'center',
        perPage: 1,
        pagination: false,
        arrows: false,
    });
    splide.mount();
});