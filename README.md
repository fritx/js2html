# js2html

> Yet the easiest way to **js** the html

To turn

```js
['audio#id.c1.c2', {
  preload: true,
  autoplay: false,
  loop: null,
  //'class': 'c3 c4',
  //'class': ['c3', 'c4'],
  'class': {
    c3: true,
    c4: true,
    c5: false
  },
  'data-a': '',
  'data-b': 'b',
  'data-c': { c: 1 }
}, [
  ['source/', {
    type: 'audio/mp3',
    src: 'media/audio-01.mp3'
  }]
]]
```

Into (with pretty)

```html
<audio id="id" preload
data-a="" data-b="b" data-c="{\\"c\\":1}"
class="c1 c2 c3 c4">
  <source type="audio/mp3" src="media/audio-01.mp3"/>
</audio>
```

More at [test.js](test.js)

## What's It For?

As a core for building **html templating lang** such as jade

```
(your_lang) <=> js <=> html
```

## A Little Hack..

For `<!doctype html>`

```js
['!doctype', { html: true }]
```
