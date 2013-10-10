var child = require('../child')

module.exports = child(function(data, done) {
  var a = 0
  var b = 1
  var c

  for (var i = 1; i < data; i += 1) {
    c = a + b
    a = b
    b = c
  }

  done(null, c)
})
