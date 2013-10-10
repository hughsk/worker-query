module.exports = createParent

function createParent(worker) {
  var pending = {}
  var ids = 0

  function request(data, callback, transfer) {
    var id = ids++
    data = { data: data, id: id }
    pending[id] = callback
    if (transfer) {
      worker.postMessage(data)
    } else {
      worker.postMessage(data, transfer)
    }
  }

  worker.addEventListener('message', function(e) {
    var id = e.data.id
    if (!pending[id]) return
    if (e.data.error) {
      pending[id].call(this, new Error(e.data.error), e.data.data)
    } else {
      pending[id].call(this, null, e.data.data)
    }
    delete pending[id]
  }, false)

  return request

}
