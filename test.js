var renderUnit = require('./js2html').renderUnit
var renderList = require('./js2html').renderList
var assert = require('assert')

var unit = ['html', [
  ['head', [
    ['meta/', {
      charset: 'utf-8'
    }],
    ['meta/', {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, user-scalable=no'
    }],
    ['title', ['Page Title']]
  ]],
  ['body', [
    ['article', [
      ['h1', ['Article Heading']],
      ['p', ['Paragraph 01']],
      ['p', ['Paragraph 02']],
      'Random String',
      ['br/'],
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
      ]],
      ['img/', {
        src: 'images/picture-01.jpg',
        alt: 'Picture 01'
      }]
    ]]
  ]]
]]

var html = '<html><head><meta charset="utf-8"/>\
<meta name="viewport" content="width=device-width, \
initial-scale=1.0, user-scalable=no"/><title>Page Title</title>\
</head><body><article><h1>Article Heading</h1><p>Paragraph 01</p>\
<p>Paragraph 02</p>Random String<br/>\
<audio id="id" preload \
data-a="" data-b="b" data-c="{\\"c\\":1}" class="c1 c2 c3 c4">\
<source type="audio/mp3" src="media/audio-01.mp3"/>\
</audio><img src="images/picture-01.jpg" alt="Picture 01"/>\
</article></body></html>'

console.log(html)

assert.equal(renderUnit(unit), html)
console.log('it parses unit!')

assert.equal(renderList([unit]), html)
console.log('it parses list!')
