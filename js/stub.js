$(function() {

    var container = $("#container");
    var resizeHandler = function() {
        container.height( $(window).height() );
        container.width( $(window).width() );
    };

     $(window).resize(resizeHandler);
     $(window).resize();

     window.slides = [];

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
     slides[current].fadeIn(500);

     function changeSlide() {

        if(current >= slides.length - 1) {
            paused = true;
            return;
        }

        slides[current].fadeOut(500);
        current = (current + 1) % slides.length;


        slides[current].fadeIn(500);
     }


     var tick = 0;
     var maxTicks = 2;
     var paused = true;

     setInterval(function() {
        if(paused) return;
        ++tick;

        if(tick > maxTicks) {
            changeSlide();
            tick = 1;
        }
        $("#counter").text(tick);
        console.log(tick);
     }, 1000);

     $(window).keydown(function(e) {
         if(e.keyCode === 32) {
            console.log("Space");
            paused = !paused;

            if(paused) {
                $("#paused").fadeIn(300);
            } else {
                $("#paused").fadeOut(300);
            }
         }
     });



});
