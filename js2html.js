var toString = Object.prototype.toString

var exports = module.exports = renderList
exports.renderList = renderList
exports.renderUnit = renderUnit

function renderList(list) {
  var markup = ''
  each(list, function(unit) {
    markup += renderUnit(unit)
  })
  return markup
}

function renderUnit(unit) {
  if (isString(unit)) return unit
  if (isArray(unit)) {
    var selfClosing = /\/$/.test(unit[0])
    var prefix = unit[0].replace(/\/$/, '')
    var attrs = {}
    var children = []
    each(unit.slice(1), function(v) {
      if (isArray(v)) children = v
      else if (isObject(v)) attrs = v
    })
    var t
    var tagName = prefix.match(/^[^#\.]+/)[0]
    var id = (t = prefix.match(/#[^#\.]+/),
      t ? t[0].slice(1) : null) // remove `#`
    var classes = prefix.match(/\.[^#\.]+/g) || []
    each(classes, function(cls, i) {
      classes[i] = cls.slice(1) // remove `.`
    })
    var markup = ''
    markup += '<' + tagName
    // id
    if (id) markup += ' id="' + id + '"'
    // attrs & classes
    each(attrs, function(v, k) {
      if (!v && v !== '') return
      else if (v === true) markup += ' ' + k
      else if (isString(v)) {
        if (k === 'class') {
          return classes = classes.concat(v.split(/\s+/))
        }
        // stringify
        markup += ' ' + k + '=' + JSON.stringify(attrs[k])
      }
      else if (isObject(v)) { 
        if (k === 'class') {
          if (isArray(v)) {
            classes = classes.concat(v)
          }
          else {
            each(v, function(b, c) {
              if (b) classes.push(c)
            })
          }
          return
        }
        // stringify * 2
        markup += ' ' + k + '=' + JSON.stringify(JSON.stringify(attrs[k]))
      }
    })
    // classes
    if (classes.length) {
      markup += ' class="' + classes.join(' ') + '"'
    }
    if (selfClosing) {
      markup += '/>'
    }
    else {
      markup += '>'
      // children
      if (children.length) {
        markup += renderList(children)
      }
      markup += '</' + tagName + '>'
    }
    return markup
  }
}

function each(obj, iterator) {
  if (isArray(obj)) {
    var i, len = obj.length
    for (i = 0; i < len; ++i) {
      iterator(obj[i], i, obj)
    }
  }
  else if (isObject(obj)) {
    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {
        iterator(obj[k], k, obj)
      }
    }
  }
}

function isString(v) {
  return typeof v === 'string'
}
function isObject(v) {
  return toString.call(v) === '[object Object]'
}
function isArray(v) {
  return toString.call(v) === '[object Array]'
}
