/*
    Provide windows.location.origin to all browsers
 */
window.location.origin = window.location.origin || window.location.protocol+'//'+window.location.host;

Array.prototype.remove = function(from, to)
{
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

if(typeof jQuery == 'function' && typeof jQuery.fn.jquery == 'string')
{
	$(window).on('resize', function()
	{
		if(this.resizeTO)
		{
			clearTimeout(this.resizeTO);
		}

		this.resizeTO = setTimeout(function()
		{
			$(this).trigger('resizeEnd');
		}, 300);
	});
}

// Basic support	FF 4	Chrome 5	IE 9	Opera 12	Safari 5

if (!Object.keys) {
  Object.keys = (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');

      var result = [];

      for (var prop in obj) {
        if (hasOwnProperty.call(obj, prop)) result.push(prop);
      }

      if (hasDontEnumBug) {
        for (var i=0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
        }
      }
      return result;
    }
  })()
};