export default function() {

  // this.namespace = '';    make this `api`, for example, if your API is namespaced
  // this.timing = 400;      delay for each request, automatically set to 0 during testing

  this.get('/rooms/:id', function(store, request) {
    var roomId = +request.params.id;
    var room = store.find('room', roomId);
    return {
      room: room
    };
  });

  this.get('/items/:id', function(store, request){
    var itemId = +request.params.id;
    var item = store.find('item', itemId);
    return {
      item: item
    };
  });

  this.get('/keys/:id', function(store, request){
    var keyId = +request.params.id;
    var key = store.find('key', keyId);
    return {
      key: key
    };
  });

}
