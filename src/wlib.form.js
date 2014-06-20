/*!
 * Weinto JavaScript Library - wlib
 * http://www.weinto.com/
 *
 *
 * Copyright 20011, 2013 Weinto, Nicolas Bages
 * nicolas.bages@weinto.com
 *
 */

var wlib = wlib || {};

wlib.form = wlib.form || {};

wlib.form.element = (function($)
{
	function Element(el)
	{
		this.el = el;
		this.val = this.el.val();
		this.errors = [];
		this.rules = [];
		this.eventObj = $({});

		this.addRule = function(rule)
		{
			this.rules.push(rule);
			return this;
		};

		this.validate = function()
		{
			var self = this;

			this.errors = [];

			this.val = self.el.val();
			
			$.each(self.rules, function(index, rule)
			{
				self.eventObj.trigger('valid');
				var is_valid = false;
				switch(rule.name)
				{
					case 'email' :
							is_valid = wlib.regex.check('email', self.val);
							if(!is_valid){self.errors.push({name:rule.name, message:rule.message});}
						break;
					case 'url' :
							is_valid = wlib.regex.check('url', self.val);
							if(!is_valid){self.errors.push({name:rule.name, message:rule.message});}
						break;
					case 'twitterusername' :
							is_valid = wlib.regex.check('twitterusername', self.val);
							if(!is_valid){self.errors.push({name:rule.name, message:rule.message});}
						break;
					case 'isNumber' :
							is_valid = wlib.regex.isNumber(self.val);
							if(!is_valid){self.errors.push({name:rule.name, message:rule.message});}
						break;
					case 'strlenMin' :
							is_valid = wlib.regex.strlenMin(self.val, rule.limit);
							if(!is_valid){self.errors.push({name:rule.name, message:rule.message});}
						break;
					case 'strlenMax' :
							is_valid = wlib.regex.strlenMax(self.val, rule.limit);
							if(!is_valid){self.errors.push({name:rule.name, message:rule.message});}
						break;
					case 'nbvalMin' :
							is_valid = wlib.regex.nbvalMin(self.val, rule.limit);
							if(!is_valid){self.errors.push({name:rule.name, message:rule.message});}
						break;
					case 'nbvalMax' :
							is_valid = wlib.regex.nbvalMax(self.val, rule.limit);
							if(!is_valid){self.errors.push({name:rule.name, message:rule.message});}
						break;
					case 'not_empty' :
							is_valid = wlib.regex.not_empty(self.val);
							if(is_valid){self.errors.push({name:rule.name, message:rule.message});}
						break;
					case 'same_as' :
							is_valid = wlib.regex.same_as(self.val, rule.challenge.val());
							if(!is_valid){self.errors.push({name:rule.name, message:rule.message});}
						break;
					case 'regex' :
							is_valid = wlib.regex.regex(self.val, rule.regex);
							if(!is_valid){self.errors.push({name:rule.name, message:rule.message});}
						break;
				}

			});

			if(self.errors.length > 0)
			{
				self.eventObj.trigger('error');
			}

			return self.errors;
		};

		this.hasError = function(key)
		{
			return ( (this.errors.join().search(key) >= 0) ? true : false);
		};

		this.on = function(key, method)
		{
			var self = this;

	        if(key === 'valid')
	        {
	            this.eventObj.on('valid', function(e, data)
	            {
	                method.call(self, data);
	            });
	        }
	        else if(key === 'error')
	        {
	            this.eventObj.on('error', function(e, data)
	            {
	            	data = data || {};
	            	data.errors = self.errors;
	                method.call(self, data);
	            });
	        }
	        else
	        {
	            this.eventObj.on('xhr-error', function(e, data)
	            {
	                method.call(self, data);
	            });
	        }
	        return this;
	    };
	}

	return Element;

})(jQuery);