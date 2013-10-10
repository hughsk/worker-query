var parent = require('../parent')
var worker = require('webworkify')

var fibonacci = parent(
  worker(require('./worker'))
)

fibonacci(80, function(err, result) {
  if (err) throw err
  document.body.innerText = String(result)
})
