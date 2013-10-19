/* 
 * The code is written using GovnoCode coding standart.
 * Please take it into account when contributing.
 * The code is distributed under IDACWSEUI license 
 * (I Don't Actually Care, Will Someone Ever Use It?)
 */

$(function() {
    // Makes containter fullscreened (TODO: make it with CSS!)
    var container = $("#container");
    var resizeHandler = function() {
        container.height( $(window).height() );
        container.width( $(window).width() );
    };

    $(window).resize(resizeHandler);
    $(window).resize();
});

$(window).on("load", function() {
    var container = $("#container");

    $("#loading").hide(0);
    var fadeDuration = 250;

    slides = [];
     $(".slide-image").each(function(i, elem) {
        var slideElement = $("<div>").addClass("slide");

        container.append(slideElement);
        var el = $(elem);

        var imgSrc = el.attr("src");

        slideElement.css('background-image','url(' + imgSrc + ')');
        slideElement.hide(0);

        slides.push(slideElement);
     });

     var current = 0;
     slides[current].fadeIn(fadeDuration);


     // The function changes the slides to the next one
     function nextSlide() {
        if(current === slides.length - 1) 
            return;

        slides[current].fadeOut(fadeDuration);
        current = (current + 1) % slides.length;
        slides[current].fadeIn(fadeDuration);
     }


     // The function changes the slides to the previous one
     function previousSlide() {
        if(current === 0) 
            return;

        slides[current].fadeOut(fadeDuration);
        current = (current - 1) % slides.length;
        slides[current].fadeIn(fadeDuration);
     }

     var tick = 0;
     var maxTicks = 20;
     var paused = false;

     function tickHandler() {
        if(paused) {
            $("#counter").text("P");
        } else {
            ++tick;

            if(tick > maxTicks) {
                nextSlide();
                tick = 1;
            }
            $("#counter").text(tick); 
        }
        setTimeout(tickHandler, 1000);
     };

     tickHandler();


     var KEY_RIGHT = 39;
     var KEY_LEFT  = 37;
     var KEY_SPACE = 32;

     $(window).keydown(function(e) {
        switch(e.keyCode) {
            case KEY_LEFT:
                tick = 0;
                previousSlide();
            break;

            case KEY_RIGHT:
                tick = 0;
                nextSlide();
            break;

            case KEY_SPACE:
                paused = !paused;
                console.log(paused);
            break;
        }
     });
});
