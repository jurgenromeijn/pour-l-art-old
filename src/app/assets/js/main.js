/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var cbpAnimatedHeader = (function() {

	var docElem = document.documentElement,
		header = $( '.navbar-default' ),
		didScroll = false,
		changeHeaderOn = 1;

	function init() {
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 100 );
			}
		}, false );
		scrollPage();
	}

	function scrollPage() {
		var sy = scrollY();
		if ( sy >= changeHeaderOn ) {
			header.removeClass('navbar-intro')
		}
		else {
			header.addClass('navbar-intro');
		}
		didScroll = false;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	init();

})();

var scrollLink = (function() {
	$('a.link-scroll').click(function(e) {
		var target = $(this).attr('href');
		e.preventDefault();
		$('html, body').animate({ scrollTop: $(target).offset().top }, 1000);
		$(this).blur();
	});
})();

var isMobile = function() {
	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		return true;
	}
	return false;
};

var mobileSize = (function() {
	if(isMobile()) {
		$('.section-hero').height($(window).height());

		$(window).on("orientationchange", function(){
			$('.section-hero').height($(window).height());
		});
	}
})();