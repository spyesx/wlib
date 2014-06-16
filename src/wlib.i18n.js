var wlib = wlib || {};

(function() {
	function i18n() {

		if(! wlib.cookies)
		{
			console.error('wlib.cookes required to use i18n');
		}

		this.current    = '';
		this.allowed    = ['fr', 'es', 'en'];
		this.default 	= 'fr';
	}

	i18n.prototype.navigator = function()
	{
		var lang = window.navigator.userLanguage || window.navigator.language;
		return lang;
	};

	i18n.prototype.exists = function(lang)
	{
		return this.allowed.some(function(el, index, array){
			return el == lang;
		});
	};

	i18n.prototype.setCurrent = function(lang)
	{
		wlib.cookies.set('lang', lang);
		this.current = lang;
	};

	i18n.prototype.setLang = function(lang)
	{
		if(lang == '' || lang == null)
		{
			var lang = wlib.cookies.get('lang');
			if(! lang)
			{
				var lang = this.navigator();
			}
		}

		if( ! this.exists(lang))
		{
			// This lang doesn't exist so we use the default one
			lang = this.default;
		}

		this.setCurrent(lang);
		wlib.console.info('Language used:', lang);
	};

	i18n.prototype.userLang = function()
	{
		var lang = wlib.cookies.get('lang');
		if(lang){
			return lang;
		}

		lang = this.navigator();

		if( ! this.exists(lang))
		{
			lang = this.default;
		}

		return lang;
	};


	wlib.i18n = i18n;

})();