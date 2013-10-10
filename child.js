module.exports = createQuery

function createQuery(query) {
  return function response(worker) {
    worker.addEventListener('message', function(e) {
      var id = e.data.id
      var fired = false

      query.call(worker, e.data.data, function(err, data, transfer) {
        if (fired) err = err || new Error('Callback can only be fired once')

        data = err
          ? { error: err.message }
          : { id: id, data: data }

        fired = true
        if (transfer) {
          worker.postMessage(data, transfer)
        } else {
          worker.postMessage(data)
        }
      })
    })
  }
}
