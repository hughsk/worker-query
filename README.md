# worker-query [![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

Reduces the boilerplate in setting up a request/response pattern between your
main thread and a web worker. Intended for use with
[browserify](http://browserify.org) and
[webworkify](http;//github.com/substack/webworkify).

[![worker-query](https://nodei.co/npm/worker-query.png?mini=true)](https://nodei.co/npm/worker-query)

## Example ##

Here's a trivial example of calculating the nth fibonacci number. There's some
code you can browserify in the `example` folder too.

``` javascript
// index.js
var fibonacci = require('./setup')

fibonacci(80, function(err, result) {
  if (err) throw err
  console.log(result) // 23416728348467684
})
```

``` javascript
// setup.js
var parent = require('worker-query/parent')
var worker = require('webworkify')

module.exports = parent(
  worker(require('./fibonacci'))
)
```

``` javascript
// fibonacci.js
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
```

## API ##

##### `require('worker-query/child')(request(data, done(err, result[, transfers])))` #####

Creates and returns a worker template: calling that function on a clean worker
will set up everything you need on the worker's end. `request` is a function
called every time data is requested with the `data` supplied and a `done`
callback you should call with the result.

##### `get = require('worker-query/parent')(worker)` #####

Takes a fresh `worker` and sets up everything you need on the parent script's
end to request data from it. Returns a function you can use to request data.

##### `get(data, callback(err, result)[, transfers])` #####

Pass `data` to the worker - when it's ready, it should return the `result`
through `callback`. Optionally, you can pass through an array of transferable
objects as a third argument for better performance.
