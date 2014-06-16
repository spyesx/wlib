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

* log : wlib.console.log()
* debug : wlib.console.debug()
* info : wlib.console.info()
* warn : wlib.console.warn()
* error : wlib.console.error()
* trace : wlib.console.trace()
* group : wlib.console.group()
* groupEnd : wlib.console.groupEnd()
* dir : wlib.console.dir()
* dirxml : wlib.console.dirxml()

A little plus

* log : wlib.console.mode('on')
* log : wlib.console.mode('off')

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