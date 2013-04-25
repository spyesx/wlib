wlib.form.element
=================

## HTML

```html

<script type="text/javascript" src="wlib/wlib.regex.js"></script>
<script type="text/javascript" src="wlib/wlib.form.js"></script>

```

```html
<form action="/" method="post" id="mySuperForm">
	<div>
		<label for="first_name">First name</label> 
		<input id="first_name" type="text" value="" />
	</div>
	<div>
		<label for="last_name">Last name</label> 
		<input id="last_name" type="text" value="" />
	</div>
	<div>
		<input type="submit" value="send" />
	</div>
</form>

```

## JavaScript

```js

$(document).ready(function()
{
	var fields = {};

	fields['first_name'] = new wlib.form.element($('#first_name'))
								.addRule({name : 'email'})
								.on('valid', function(){
									this.el.css({background:'none'});
								})
								.on('error', function(datas){
									this.el.css({background:'#ff5a67'}).after('<span>Your first name is not an email</span>');
								});

	fields['last_name'] = new wlib.form.element($('#last_name'))
								.addRule({name : 'email'})
								.on('valid', function(){
									this.el.css({background:'none'});
								})
								.on('error', function(datas){
									this.el.css({background:'#ff5a67'}).after('<span>Your last name is not an email</span>');
								});


	$('#mySuperForm').on('submit', function(e)
	{
		e.preventDefault();

		var _errors = 0;

		$.each(fields, function(index, element)
		{
			if(element.validate().length > 0){
				_errors++;
			}
		});

		if(_errors > 0)
		{
			// there is an error
			console.log('check your form');
		}
		else
		{
			// evrything is good
			console.log('evrything is good');
		}
	});
});

```

## Add a rule to an element

```js

// eMail
element.addRule({name:'email'});

// URL
element.addRule({name:'url'});

// Number
element.addRule({name:'isNumber'});

// Minimum string length
element.addRule({name:'strlenMin', limit:20});

// Maximum string length
element.addRule({name:'strlenMax', limit:40});

// Minimum
element.addRule({name:'nbvalMin', limit:20});

// Maximum
element.addRule({name:'nbvalMax', limit:40});

// Not empty
element.addRule({name:'not_empty'});

// Same as
element.addRule({name:'same_as', :challenge: $('#your_field_id') });

// REGEX
$element.addRule({name:'regex', regex : /^0[1-9][0-9]{8}$/ });

```





