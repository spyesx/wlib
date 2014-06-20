var wlib = wlib || {};

(function(window, document, undefined)
{
	'use strict';

	wlib.responsive = wlib.responsive || {};

	wlib.responsive.img = (function()
	{

		var inspect_src = function()
		{
			var dataAttr = 'data-responsiveimg-';
			var elements = document.querySelectorAll('['+dataAttr+'*]');
			var elementsLength = elements.length;

			var emptySrc = [];

			for(var i=0; i<elementsLength; i++)
			{
				wlib.console.group('wlib.responsive.img : src');
				if(elements[i].getAttribute('src') === '')
				{
					wlib.console.warn(elements[i]);
				}
				wlib.console.groupEnd('wlib.responsive.img : src');
			}

			var emptySrcLength = emptySrc.length;

			if( emptySrcLength > 0)
			{
				for(var j=0; j<emptySrcLength; j++)
				{
					wlib.console.log('wlib.responsive.img : src are empty for these elements');
					wlib.console.group('wlib.responsive.img : src');
					wlib.console.warn(emptySrc[j]);
					wlib.console.groupEnd('wlib.responsive.img : src');
				}
			}
		};

		var populate_src = function(breakpointName)
		{
			var dataAttr = 'data-responsiveimg-'+breakpointName;
			var elements = document.querySelectorAll('['+dataAttr+']');
			var elementsLength = elements.length;

			for(var i=0; i<elementsLength; i++)
			{
				elements[i].setAttribute('src', imgs[i].dataset[dataAttr]);
			}
		};

		var populate_style = function(breakpointName)
		{
			var dataAttr = 'data-responsiveimg-background-'+breakpointName;
			var elements = document.querySelectorAll('['+dataAttr+']');
			var elementsLength = elements.length;

			for(var i=0; i<elementsLength; i++)
			{
				elements[i].style.backgroundImage = imgs[i].dataset[dataAttr];
			}
		};

		var Responsive_Img = function()
		{
			if(! wlib.console ){console.error('wlib.console is required to use Responsive_Img class.');}
			if(! wlib.events ){console.error('wlib.events is required to use Responsive_Img class.');}
			if(! wlib.viewport ){console.error('wlib.viewport is required to use Responsive_Img class.');}

			this.VERSION = '2014.06.20';
		};


		Responsive_Img.prototype.init = function()
		{
			var that = this;

			inspect_src();

			wlib.events.on('wlib/viewport/breakpoint/change', function(datas)
			{
				that.refresh( datas.breakpointName);
			});
		};

		Responsive_Img.prototype.refresh = function(breakpointName)
		{
			breakpointName = breakpointName + (window.devicePixelRatio > 1 ? '-x2' : '');
			populate_src(breakpointName);
			populate_style(breakpointName);
		};

		return Responsive_Img;

	})();

}(window, document));