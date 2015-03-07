import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: RoomNavigation', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting a room', function(assert) {
  assert.expect(1);

  server.create('room', {description: 'in a cold and scary place'});
  visit('/rooms/1');

  andThen(function() {
    assert.equal(find('p.room-description').text().replace(/\s+/g, " "), 'you are in a cold and scary place. ');
    // ...
  });
});

test('visiting rooms in a cruel and infinite loop', function(assert) {
  server.create('room', {description: 'in a cold and scary place', north: 2, south: 3});
  server.create('room', {description: 'in the north', south: 1, north: 3});
  server.create('room', {description: 'in the south', north: 1, south: 2});
  visit('/rooms/1');
  click('a.north');
  andThen(function() {
    assert.equal(find('p.room-description').text().replace(/\s+/g, " "), 'you are in the north. ');
  });
  click('a.north');
  andThen(function() {
    assert.equal(find('p.room-description').text().replace(/\s+/g, " "), 'you are in the south. ');
  });
  click('a.north');
  andThen(function() {
    assert.equal(find('p.room-description').text().replace(/\s+/g, " "), 'you are in a cold and scary place. ');
  });
});

test('does not show nonexistent room links', function(assert){
  assert.expect(4);
  server.create('room', {description: 'a cold and scary place', north: 2});
  server.create('room', {description: 'northward!', south: 1});
  visit('/rooms/1');
  andThen(function(){
    assert.equal(find('a.north').length, 1);
    assert.equal(find('a.west').length, 0);
    assert.equal(find('a.east').length, 0);
    assert.equal(find('a.south').length, 0);
  });
});

test('shows brief name of linked rooms', function(assert){
  assert.expect(3);
  server.create('room', {name: 'home', description: 'a cold and scary place', north: 2, south: 3});
  server.create('room', {name: 'hallway', south: 1, north: 3});
  server.create('room', {name: 'darkened door', north: 1, south: 2});
  visit('/rooms/1');
  andThen(function(){
    assert.equal(find('a.north:contains("hallway")').length, 1);
    assert.equal(find('a.south:contains("darkened door")').length, 1);
  });
  click('a.north');
  andThen(function(){
    assert.equal(find('a.south:contains("home")').length, 1);
  });
});

test('room is inaccessible without its key', function(assert){
  assert.expect(3);
  var key = server.create('key', {description: 'a huge key', room_id: 1});
  var item = server.create('item', {name: 'a void', key: key.id});
  var locked_room = server.create('room', {description: "awesome", locked: true});
  var room = server.create('room', {description: 'a boring hallway', south: locked_room.id, items: [item.id]});
  visit('/rooms/'+room.id);
  click('a.south');
  andThen(function(){
    assert.equal(find('p.room-description').text().replace(/\s+/g, " "), 'you are a boring hallway. you see a void. ');
    assert.equal(find('div.messages').text().replace(/^\s+|\s+$/g, ''), 'You need a key to get in there!');
  });
  click('a.item');
  click('a.key');
  click('a.south');
  andThen(function(){
    assert.equal(find('p.room-description').text().replace(/\s+/g, " "), 'you are awesome. ');
  });
});

test('locked room messages go away', function(assert){
  assert.expect(3);
  var other_room = server.create('room');
  var locked_room = server.create('room', {locked: true});
  var room = server.create('room', {description: 'a boring hallway', south: locked_room.id, north: other_room.id});
  visit('/rooms/'+room.id);
  click('a.south');
  andThen(function(){
    assert.equal(find('p.room-description').text().replace(/\s+/g, " "), 'you are a boring hallway. ');
    assert.equal(find('div.messages').text().replace(/^\s+|\s+$/g, ''), 'You need a key to get in there!');
  });
  click('a.north');
  andThen(function(){
    assert.equal(find('div.messages').text().replace(/^\s+|\s+$/g, ''), '');
  });
});