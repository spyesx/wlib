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
		this.eventObj = {};

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
				$(self.eventObj).trigger('valid');

				switch(rule.name)
				{
					case 'email' :
							var is_valid = wlib.regex.check('email', self.val);
							if(!is_valid){self.errors.push(rule.name);}
						break;
					case 'url' :
							var is_valid = wlib.regex.check('url', self.val);
							if(!is_valid){self.errors.push(rule.name);}
						break;
					case 'isNumber' :
							var is_valid = wlib.regex.isNumber(self.val);
							if(!is_valid){self.errors.push(rule.name);}
						break;
					case 'strlenMin' :
							var is_valid = wlib.regex.strlenMin(self.val, rule.limit);
							if(!is_valid){self.errors.push(rule.name);}
						break;
					case 'strlenMax' :
							var is_valid = wlib.regex.strlenMax(self.val, rule.limit);
							if(!is_valid){self.errors.push(rule.name);}
						break;
					case 'nbvalMin' :
							var is_valid = wlib.regex.nbvalMin(self.val, rule.limit);
							if(!is_valid){self.errors.push(rule.name);}
						break;
					case 'nbvalMax' :
							var is_valid = wlib.regex.nbvalMax(self.val, rule.limit);
							if(!is_valid){self.errors.push(rule.name);}
						break;
					case 'not_empty' :
							var is_valid = wlib.regex.not_empty(self.val);
							if(is_valid){self.errors.push(rule.name);}
						break;
					case 'same_as' :
							var is_valid = wlib.regex.same_as(self.val, rule.challenge.val());
							if(!is_valid){self.errors.push(rule.name);}
						break;
					case 'regex' :
							var is_valid = wlib.regex.regex(self.val, rule.regex);
							if(!is_valid){self.errors.push(rule.name);}
						break;
				}

			});

			if(self.errors.length > 0)
			{
				$(self.eventObj).trigger('error');
			}

			return self.errors;
		};

		this.hasError = function(key)
		{
			return ( (self.errors.join().search('same_as') >= 0) ? true : false);
		};

		this.on = function(key, method)
		{
			var self = this;

	        if(key == 'valid')
	        {
	            $(this.eventObj).on('valid', function(e, data)
	            {
	                method.call(self, data);
	            });
	        }
	        else if(key == 'error')
	        {
	            $(this.eventObj).on('error', function(e, data)
	            {
	            	var data = data || {};
	            	data.errors = self.errors;
	                method.call(self, data);
	            });
	        }
	        else
	        {
	            $(this.eventObj).on('xhr-error', function(e, data)
	            {
	                method.call(self, data);
	            });
	        }
	        return this;
	    };
	}

	return Element;

})(jQuery);