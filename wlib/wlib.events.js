/*
	Singleton based on jQuery events
 */

var wlib = wlib || {};

(function($)
{
	function Events()
	{
		this._e = $({});

		this.listen = function()
		{
			this._e.on.apply(this._e, arguments);
		};

		this.remove = function()
		{
			this._e.off.apply(this._e, arguments);
		};

		this.trigger = function()
		{
			this._e.trigger.apply(this._e, arguments);
		};
	}

	wlib.events = new Events();

})(jQuery);