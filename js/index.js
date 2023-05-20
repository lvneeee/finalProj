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
            localStorage.setItem('headerState', 'bg_light');
        } else {
            header.removeClass('bg_light');
            links.removeClass('text_dark');
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

    // loop vid 
    const bgVideo = $("#main_video").get(0);
    bgVideo.onended = function() {
    setTimeout(function() {
        bgVideo.currentTime = 0;
        bgVideo.play();
        }, 1500);
    };

    // parallax .section_1
    $(document).on('scroll', function() {
        const scrollTop = $(this).scrollTop();
        const parallax = $('.parallax');
        parallax.css('transform', `translateY(${scrollTop * 0.5}px)`);
    });

    // animate section_2
    function animateText(bannerId, textLines, waitTime) {
        const banner = document.getElementById(bannerId);
        let i = 0, j = 0, wait = waitTime;
        setInterval(() => {
            if(wait-- > 0) return;
            if(wait == -1) banner.innerHTML = '';
            if(i < textLines.length) {
                if(j < textLines[i].length) {
                    banner.innerHTML += textLines[i][j++];
                } else {
                    wait = 8, j = 0, i++;
                }
            } else wait = 8, j = 0, i = 0;
        }, 200);
    }
    
    animateText('brand_animation', ['Extreme Gen-'], 6);
    animateText('brand_animation_2', ['MICHT'], 6);
    animateText('brand_animation_3', ['MICHT', 'Extreme Generation'], 6);

    // add to cart
    let cartItems = [];

    $(".add_to_cart").click(function() {
        const productId = $(this).data("id");
        const productName = $(this).data("name");
        const productPrice = $(this).data("price");
        const productElement = $(this).closest(".cards");
        const productImage = productElement.find(".image img").attr("src");

        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };
        addToCart(product);
        updateCart();
    });

    function addToCart(product) {
        if (!product || !product.id || !product.name || !product.price || !product.image) {
            return;
        }

        let productAlreadyInCart = false;
        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].id === product.id) {
            cartItems[i].quantity++;
            productAlreadyInCart = true;
            break;
            }
        }
        if (!productAlreadyInCart) {
            cartItems.push(product);
        }
        updateCart();
    }

    function removeCartItem(index) {
        cartItems.splice(index, 1);
        updateCart();
    }

    function subtractQuantity(index) {
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
            updateCart();
        }
    }

    function addQuantity(index) {
        cartItems[index].quantity++;
        updateCart();
    }

    function updateCart() {
        const cart = $("#cart_list");
        const cartCount = $("#cart_count");
        const cartTotal = $("#cart_total");
        const cartActions = $("#cart_actions")
        const cartNoti = $("#cart_noti")

        cart.empty();
        let totalQuantity = 0;
        let totalPrice = 0;
        
        for (let i = 0; i < cartItems.length; i++) {
            const item = cartItems[i];
            const itemElement = $("<li></li>").addClass("cart_item");
            const itemImage = $("<img>").attr("src", item.image).addClass("cart_item_image");
            const itemDetail = $("<div></div>").addClass("item_detail");
            const itemName = $("<div></div>").addClass("product_name").text(item.name);
            console.log("itemName:", itemName);

            const itemPrice = $("<div></div>").addClass("product_price").text('$' + item.price);
            console.log("itemPrice:", itemPrice);

            const itemQuantity = $("<div></div>").addClass("quantity_select");
            const itemQuantityMinusBtn = $("<button>-</button>").on("click", function() {
                subtractQuantity(i); 
            });
            const itemQuantityInput = $("<input>").attr("type", "text").attr("value", item.quantity).prop("disabled", true);
            const itemQuantityPlusBtn = $("<button>+</button>").on("click", function () {
                addQuantity(i); 
            });
            const itemRemoveBtn = $("<button><ion-icon name='close'></ion-icon></button>").addClass("remove_btn").on("click", function () {
                removeCartItem(i); 
            });
            itemQuantity.append(itemQuantityMinusBtn, itemQuantityInput, itemQuantityPlusBtn);
            itemDetail.append(itemRemoveBtn, itemName, itemPrice, itemQuantity);
            itemElement.append(itemImage, itemDetail);
            cart.append(itemElement);
            totalQuantity += item.quantity;
            totalPrice += item.quantity * item.price;
        }

        cartCount.text(totalQuantity);
        if (totalQuantity > 0) {
            cartCount.removeClass("hide");
        } else {
            cartCount.addClass("hide");
        }

        cartTotal.find("#cart_total_value").text(totalPrice.toFixed(2));
        if (totalPrice > 0) {
            cartTotal.removeClass("hide");
            cartActions.removeClass("hide");
            cartNoti.addClass("hide");
            cart.removeClass("hide");
        } else {
            cart.addClass("hide")
            cartTotal.addClass("hide");
            cartActions.addClass("hide");
            cartNoti.removeClass("hide").addClass("show");
        } 

        console.log("cartItems:", cartItems);
        console.log("totalQuantity:", totalQuantity);
    }


    // hàm xử lý menu
    $('.dropend').each(function() {
        $(this).hover(
            function() {
                $(this).find('.dropend_menu').toggleClass('show');
            },
            function() {
                $(this).find('.dropend_menu').toggleClass('show');
            }
        );
    });

    // splide
    var splide = new Splide('#image_carousel', {
        type: 'loop',
        rewind: true,
        autoplay: true,
        // drag: false,
        focus: 'center',
        perPage: 1,
        pagination: false,
        arrows: false,
        width : '100%',
		height: '750px',
        cover: true,
        brakepoints: {
            1400: {width: '100%', height: '800px', cover: false},
            800: { width: '100%', height: '600px', cover: true},
        },
    });
    splide.mount();
});