var wlib = wlib || {};
wlib.viewport = (function()
{
	var Viewport = function()
	{
		if(! wlib.console ){console.error('wlib.console is required to use Responsive_Img class.');}
		if(! wlib.events ){console.error('wlib.events is required to use Responsive_Img class.');}
		if(! wlib.viewport ){console.error('wlib.viewport is required to use Responsive_Img class.');}
	};

	Viewport.prototype.disableScroll = function()
	{
		var htmlElement = document.getElementsByTagName('html')[0];
		htmlElement.style.overflow = 'hidden';
	};

	Viewport.prototype.enableScroll = function()
	{
		var htmlElement = document.getElementsByTagName('html')[0];
		htmlElement.style.overflow = 'auto';
	};

	Viewport.prototype.breakpoint = (function()
	{

		var Viewport_Breakpoint = function()
		{
			var t = this;
			this.sizes = [];
			this.current = '';
		};

		Viewport_Breakpoint.prototype.set = function(name, mediaquery)
		{
			this.sizes.push({name:name, mq:mediaquery});
			//this.current = this.identify();
			return this;
		};

		Viewport_Breakpoint.prototype.get = function(name)
		{
			var index = this.sizes.find(function(element, index, value)
			{
				if(element.name === name)
				{
					return index;
				}
			});

			return index;
		};

		Viewport_Breakpoint.prototype.identify = function()
		{
			var element = this.sizes.find(function(element, index, value)
			{
				if(window.matchMedia && matchMedia(element.mq).matches)
				{
					return element;
				}
			});

			if(typeof element !== 'undefined')
			{
				if(this.current !== element.name)
				{
					this.current = element.name;
					wlib.events.trigger('wlib/viewport/breakpoint/change', { 'breakpointName' : element.name });
				}

				return element.name;
			}

			return false;
		};

		return new Viewport_Breakpoint();

	})();


	Viewport.prototype.orientation = (function()
	{
		function Viewport_Orientation(){
			var t = this;

			if(typeof window.orientationchange === 'undefined')
			{
				window.orientationchange = new CustomEvent("orientationchange", { "type": "orientationchange" });
				wlib.console.warn('Viewport: Event "orientationchange" was previously not supported on this device. Now added.');
			}

			window.addEventListener('orientationchange', function(e)
			{
				if(typeof t.onChange === 'function')
				{
					t.onChange.apply(t, e);
				}
				else
				{
					wlib.console.log(t.get());
				}
			}, false);
		}

		Viewport_Orientation.prototype.get = function()
		{
			if(window.matchMedia)
			{
				return matchMedia("(orientation: landscape)").matches === true ? 'landscape' : 'portrait';
			}
		};

		Viewport_Orientation.prototype.onChange = false;

		return new Viewport_Orientation();
	})();

	return Viewport;

})();
