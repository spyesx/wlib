## wlib.console

``wlib.console`` works exactly the same as ``console`` with some additional features.

1. It prevents console issues on old browsers by creating ``console`` if it's not available
2. It provides a ``on/off`` mode for debugging. That make us able to keep our console messages on a dev environment or turn them on when needed.


### Install

```html
<script type="text/javascript" src="wlib/wlib.console.js"></script>
```

### How to use on/off mode?

There is nothing easier.

```javascript
wlib.console.mode('on'); // Turn on the console (default)
wlib.console.mode('off'); // Turn off the console
```

### API

Exactly like the console provided by your browser:

* __log__ : wlib.console.log()
* __debug__ : wlib.console.debug()
* __info__ : wlib.console.info()
* __warn__ : wlib.console.warn()
* __error__ : wlib.console.error()
* __trace__ : wlib.console.trace()
* __group__ : wlib.console.group()
* __groupEnd__ : wlib.console.groupEnd()
* __dir__ : wlib.console.dir()
* __dirxml __: wlib.console.dirxml()

A little plus

* __mode__ : wlib.console.mode('on')
* __mode__ : wlib.console.mode('off')

### Examples

Regular use

```javascript
wlib.console.log('hello!');
// hello!
```

Turn off

```javascript
wlib.console.log('hello!');
// hello!

wlib.console.mode('off');
wlib.console.log('hello!');
// (nothing will happen)

wlib.console.mode('on');
wlib.console.log('what\'s up?');
// what's up?
```