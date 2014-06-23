var wlib = wlib || {};

(function(window, document, undefined)
{
	'use strict';

	wlib.responsive = wlib.responsive || {};

	wlib.responsive.img = (function()
	{
		var populate_src = function(breakpointName)
		{
			var dataAttr = 'data-responsiveimg-'+breakpointName;
			var dataAttrFragments = dataAttr.replace('data-', '').split('-');

			for(var i=1; i<dataAttrFragments.length; i++)
			{
				dataAttrFragments[i] = dataAttrFragments[i][0].toUpperCase() + dataAttrFragments[i].slice(1);
			}

			var dataAttrDOM = dataAttrFragments.join().replace(/,/g, '');

			var elements = document.querySelectorAll('['+dataAttr+']');
			var elementsLength = elements.length;

			for(i=0; i<elementsLength; i++)
			{
				elements[i].setAttribute('src', elements[i].dataset[dataAttrDOM]);
			}
		};

		var populate_style = function(breakpointName)
		{
			var dataAttr = 'data-responsiveimg-'+breakpointName;
			var dataAttrFragments = dataAttr.replace('data-', '').split('-');

			for(var i=1; i<dataAttrFragments.length; i++)
			{
				dataAttrFragments[i] = dataAttrFragments[i][0].toUpperCase() + dataAttrFragments[i].slice(1);
			}

			var dataAttrDOM = dataAttrFragments.join().replace(/,/g, '');

			var elements = document.querySelectorAll('['+dataAttr+']');
			var elementsLength = elements.length;

			for(i=0; i<elementsLength; i++)
			{
				elements[i].style.backgroundImage = elements[i].dataset[dataAttr];
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

			wlib.events.listen('wlib/viewport/breakpoint/change', function(e, datas)
			{
				that.refresh( datas.breakpointName);
			});
		};

		Responsive_Img.prototype.refresh = function(breakpointName)
		{
			breakpointName = breakpointName.replace('-', '') + (window.devicePixelRatio > 1 ? '-x2' : '');
			populate_src(breakpointName);
			populate_style(breakpointName);
		};

		return Responsive_Img;

	})();

}(window, document));