var scrollLink = (function() {
	$('a.link-scroll').click(function(e) {
		var target = $(this).attr('href');
		e.preventDefault();
		$('html, body').animate({ scrollTop: $(target).offset().top - 90 }, 1000);
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