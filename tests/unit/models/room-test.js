import {
  moduleForModel,
  test
} from 'ember-qunit';

import Ember from 'ember';

moduleForModel('room', {
  // Specify the other units that are required for this test.
  needs: ["model:item", "model:key", "model:thing"]
});

test('it handles inverted coordinates', function(assert) {
  assert.expect(4);
  var store = this.store();
  var rooms = [
    {id: 1, description: "center", north: 2, west: 3, south: 4, east: 5},
    {id: 2, description: "north", south: 1},
    {id: 3, description: "west", east: 1},
    {id: 4, description: "south", north: 1},
    {id: 5, description: "east", west: 1}
  ];
  Ember.run(function(){
    store.pushMany('room', rooms);
    store.find('room', 1).then(function(room){
      assert.equal(room.get('north.description'), 'north');
      assert.equal(room.get('south.description'), 'south');
      assert.equal(room.get('west.description'), 'west');
      assert.equal(room.get('east.description'), 'east');
    });
  });

});

