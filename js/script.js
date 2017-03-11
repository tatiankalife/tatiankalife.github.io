
(function(){


    // Settings ---

    // Set scale - between 1.00 and 1.99
    var scale = 1.05;


    // Init ---

    // Select container to be css transformed
    var container = document.getElementsByClassName("bgmove")[0];

    // Get container dimensions
    getContainerDimensions();

    // Calculate offset each direction
    var offset = ((scale - Math.floor(scale)) / 2) * 100; 

    // Prepare css and browser prefix
    scale = "scale(" + scale + ")";
    container.style.webkitTransform = scale;
    container.style.MozTransform = scale;
    container.style.msTransform = scale;
    container.style.OTransform = scale;
    container.style.transform = scale;


    // Event listeners ---

    window.addEventListener("resize", function() {
        getContainerDimensions()
    });

    container.addEventListener("mousemove", function(e) {
        moveBgImage(e);
    });


    // Helper functions ---

    function getContainerDimensions() {
        width = container.offsetWidth;
        height = container.offsetHeight;    
    }

    function moveBgImage(e) {
        // Find center of container
        var pageX = e.pageX - (width / 2);
        var pageY = e.pageY - (height / 2);

        // Calculate movement
        var newX = -(pageX / ((width/2)/offset));
        var newY = -(pageY / ((height/2)/offset));

        // Move bgimage
        container.style.webkitTransform = "translate(" + newX + "%," + newY + "%) " + scale;
        container.style.MozTransform = "translate(" + newX + "%," + newY + "%) " + scale;
        container.style.msTransform = "translate(" + newX + "%," + newY + "%) " + scale;
        container.style.OTransform = "translate(" + newX + "%," + newY + "%) " + scale;
        container.style.transform = "translate(" + newX + "%," + newY + "%) " + scale;          
    }


})();

var header = document.querySelector("header");
var stickyNav = document.querySelector("#stickyNav");

// TODO: throttle this function for optimal performance in production
window.addEventListener('scroll', function(e){
  var scrollPos = window.pageYOffset || document.documentElement.scrollTop;
  var stickyLine = header.scrollHeight - stickyNav.scrollHeight;
  if(scrollPos > stickyLine){
    stickyNav.classList.add("fixed");
  }else if(stickyNav.classList.contains('fixed')){
    stickyNav.classList.remove("fixed");
  }
});

var header = document.querySelector("header");
var stickyNav = document.querySelector("#stickyNav");

// TODO: throttle this function for optimal performance in production
window.addEventListener('scroll', function(e){
  var scrollPos = window.pageYOffset || document.documentElement.scrollTop;
  var stickyLine = header.scrollHeight - stickyNav.scrollHeight;
  if(scrollPos > stickyLine){
    stickyNav.classList.add("fixed");
  }else if(stickyNav.classList.contains('fixed')){
    stickyNav.classList.remove("fixed");
  }
});

$(document).ready(function() {  $('a[href*=#]:not([href=#]):not([href=#show]):not([href=#hide])').click(function() {
    if ($(window).width() < 768) {
      $('#mainPage').removeClass('open');
      setTimeout(function(){$('#mainPage').removeClass('visible');}, 250);
      open = 0;
    }
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

// Return an array of elements matching a CSS selector
function $$(sel) { 
  return Array.prototype.slice.call(document.querySelectorAll(sel));
}

// Add an event handler to an element
function on(elt, event, handler) {
  if (elt.addEventListener) {
    // W3C DOM
    elt.addEventListener(event, handler, false);
  } else if (elt.attachEvent) { 
    // IE DOM
    return elt.attachEvent(event === "load" ? "DOMContentLoaded" : ("on" + event), handler);
  }
}

// Once the document is loaded, add the specified class to all elements that are to be revealed so they can be set in their initial (non-revealed) state
on(window, "load", function() {
  $$(".reveal-on-scroll").forEach( function(e) {
    e.classList.add(e.getAttribute("data-scrolled-out-class"));
  });
});


// When the document is scrolled, if an element with the reveal-on-scroll class comes into view, removes its "scrolled-out-class", and add it back if it becomes out of view again.
on(document, "scroll", function() {
  // window.pageYOffset works in all browsers >IE8
  // document.body.scrollTop works in WebKit
  // document.documentElement.scrollTop works in Firefox
  var scrollTop = window.pageYOffset + window.innerHeight;
  $$(".reveal-on-scroll").forEach( function(e) {
    if ((e.offsetTop + e.offsetHeight / 2) < scrollTop) {
      e.classList.remove(e.getAttribute("data-scrolled-out-class"));
    } else {
      e.classList.add(e.getAttribute("data-scrolled-out-class"));
    }
  });
});

(function($) {
  
  // Open Lightbox
  $('.open-lightbox').on('click', function(e) {
    e.preventDefault();
    var image = $(this).attr('href');
    $('html').addClass('no-scroll');
    $('body').append('<div class="lightbox-opened"><img src="' + image + '"></div>');
  });
  
  // Close Lightbox
    $('body').on('click', '.lightbox-opened', function() {
    $('html').removeClass('no-scroll');
    $('.lightbox-opened').remove();
  });
  
})(jQuery);


/*menu hamburher*/
jQuery(document).ready(function($){
  //open menu
  $('.cd-menu-trigger').on('click', function(event){
    event.preventDefault();
    $('#cd-main-content').addClass('move-out');
    $('#main-nav').addClass('is-visible');
    $('.cd-shadow-layer').addClass('is-visible');
  });
  //close menu
  $('.cd-close-menu').on('click', function(event){
    event.preventDefault();
    $('#cd-main-content').removeClass('move-out');
    $('#main-nav').removeClass('is-visible');
    $('.cd-shadow-layer').removeClass('is-visible');
  });
  $('.close-menu').on('click', function(event){
    event.preventDefault();
    $('#cd-main-content').removeClass('move-out');
    $('#main-nav').removeClass('is-visible');
    $('.cd-shadow-layer').removeClass('is-visible');
  });
  //clipped image - blur effect
  set_clip_property();
  $(window).on('resize', function(){
    set_clip_property();
  });

  function set_clip_property() {
    var $header_height = $('.cd-header').height(),
      $window_height = $(window).height(),
      $header_top = $window_height - $header_height,
      $window_width = $(window).width();
    $('.cd-blurred-bg').css('clip', 'rect('+$header_top+'px, '+$window_width+'px, '+$window_height+'px, 0px)');
  }
});