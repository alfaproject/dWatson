(function () {
	//dWatson
	var main = function ($) {

		var self = $.dWatson = new function () { };

		$.extend(self, {
			dWatsonImgs: [
				'http://platypus.ovh/dwatson/photos/5f5b4094-a86b-43f5-96ac-910a545eff1a.jpg',
				'http://platypus.ovh/dwatson/photos/20180929_041100.jpg',
				'http://platypus.ovh/dwatson/photos/dom1.png',
				'http://platypus.ovh/dwatson/photos/dom2.png',
				'http://platypus.ovh/dwatson/photos/IMG_1328.jpg',
				'http://platypus.ovh/dwatson/photos/IMG_1444.jpg',
				'http://platypus.ovh/dwatson/photos/IMG_1481.jpg',
				'http://platypus.ovh/dwatson/photos/IMG_1705.jpg',
				'http://platypus.ovh/dwatson/photos/IMG-20180929-WA0005.jpeg',
			],
			handleImages: function (lstImgs, time) {
				$.each($('img'), function (i, item) {
					//Skip if image is already replaced
					if ($.inArray($(item).attr('src'), lstImgs) == -1) {
						var h = $(item).height();
						var w = $(item).width();

						//If image loaded
						if (h > 0 && w > 0) {
							//Replace
							$(item).css('width', w + 'px').css('height', h + 'px');
							$(item).attr('src', lstImgs[Math.floor(Math.random() * lstImgs.length)]);
						}
						else {
							//Replace when loaded
							$(item).load(function () {
								//Prevent 'infinite' loop
								if ($.inArray($(item).attr('src'), lstImgs) == -1) {
									var h = $(item).height();
									var w = $(item).width();
									$(item).css('width', w + 'px').css('height', h + 'px');
									$(item).attr('src', lstImgs[Math.floor(Math.random() * lstImgs.length)]);
								}
							});
						}
					}
				});

				//Keep replacing
				if (time > 0)
					setTimeout(function () { self.handleImages(lstImgs, time); }, time);
			}
		});

		//Run on jQuery ready
		$(function () {
			self.handleImages(self.dWatsonImgs, 3000);
		});
	};

	//Method to load jQuery
	function loadJS(src, callback) {
		var s = document.createElement('script');
		s.src = src;
		s.async = true;
		s.onreadystatechange = s.onload = function () {
			var state = s.readyState;
			if (!callback.done && (!state || /loaded|complete/.test(state))) {
				callback.done = true;
				callback();
			}
		};
		document.getElementsByTagName('head')[0].appendChild(s);
	}

	//Add jQuery if not present, then run main
	if (typeof jQuery == 'undefined') {
		loadJS(('https:' == document.location.protocol ? 'https://' : 'http://') + 'ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function () {
			jQuery.noConflict();
			main(jQuery);
		});
	} else {
		main(jQuery);
	}
})();
