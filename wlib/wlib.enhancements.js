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

if(typeof jQuery == 'object' && typeof jQuery.fn.jquery == 'string')
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