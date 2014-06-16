/*!
 * Weinto JavaScript Library - wlib
 * http://www.weinto.com/
 *
 *
 * Copyright 20011, 2013 Weinto, Nicolas Bages
 * nicolas.bages@weinto.com
 *
 */

/*
    Prevent console issues on old browsers
 */

(function()
{
    var method;
    var noop = function () {};
    var methods = [
        'assert',       'clear',    'count', 'debug',   'dir',      'dirxml',   'error',
        'exception',    'group',    'groupCollapsed',   'groupEnd', 'info',     'log',
        'markTimeline', 'profile',  'profileEnd',       'table',    'time', '   timeEnd',
        'timeStamp',    'trace',    'warn'
    ];

    var length = methods.length;
    var console = (window.console = window.console || {});

    while(length--)
    {
        method = methods[length];

        if(!console[method])
        {
            console[method] = noop;
        }
    }
}());


/*
    Enhances console by giving the ability to display results or not. Enable/Disable console.
 */
var wlib = wlib || {};

(function()
{
    function Console()
    {
        var _isOn = false;

        var _isAvailable = function()
        {
            _isOn = (typeof console == 'object' && typeof console.log == 'function') ? true : false;

            this.console.log('wlib.console enabled: '+_isOn);

            return _isOn
        }

        this.isAvailable   = function(){ _isAvailable() };

        this.mode      = function(action)
        {
            if(action == 'on'){ _isOn = true; }
            if(action == 'off'){ _isOn = false; }
        };

        this.log         = function(){  if(_isOn){ console.log(arguments);}};
        this.debug       = function(){  if(_isOn){ console.debug(arguments);}};
        this.info        = function(){  if(_isOn){ console.info(arguments);}};
        this.warn        = function(){  if(_isOn){ console.warn(arguments);}};
        this.error       = function(){  if(_isOn){ console.error(arguments);}};
        this.trace       = function(){  if(_isOn){ console.trace();}};
        this.group       = function(){  if(_isOn){ console.group(arguments);}};
        this.groupEnd    = function(){  if(_isOn){ console.groupEnd();}};
        this.dir         = function(){  if(_isOn){ console.dir(arguments);}},
        this.dirxml      = function(){  if(_isOn){ console.dirxml(arguments);}};
    }

    wlib.console = new Console();
    wlib.console.isAvailable();

})();