export default function() {

  this.get('/rooms/:id', function(db, request) {
    var roomId = +request.params.id;
    var room = db.rooms.find(roomId);
    return {
      room: room
    };
  });

  this.get('/items/:id', function(db, request){
    var itemId = +request.params.id;
    var item = db.items.find(itemId);
    return {
      item: item
    };
  });

  this.get('/keys/:id', function(db, request){
    var keyId = +request.params.id;
    var key = db.keys.find(keyId);
    return {
      key: key
    };
  });

  this.get('/things/:id', function(db, request){
    var thingId = +request.params.id;
    var thing = db.things.find(thingId);
    return {
      thing: thing
    };
  });

  this.get('/treasures/:id', function(db, request){
    var treasureId = +request.params.id;
    var treasure = db.treasures.find(treasureId);
    return {
      treasure: treasure
    };
  });

}
