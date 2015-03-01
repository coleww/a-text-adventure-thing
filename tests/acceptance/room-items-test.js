import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: RoomItems', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('shows linked items in room', function(assert){
  assert.expect(2);
  var item = server.create('item', {name: 'a lumpy box of chocolates'});
  server.create('room', {description: 'gazing into the abyss', items: [item.id]});
  visit('/rooms/1');
  var expected = 'you are gazing into the abyss. you see a lumpy box of chocolates. ';
  andThen(function(){
    assert.equal(find('p.room-description').text().replace(/\s+/g, " "), expected);
    assert.equal(find('a.item').text(), 'a lumpy box of chocolates');
  });
});

test('shows "content" of that item', function(assert){
  assert.expect(1);
  var item = server.create('item', {name: 'a box', description: 'says "coca-cola" on the side.'});
  var room = server.create('room', {description: 'gazing into the abyss', items: [item.id]});
  visit('/rooms/'+room.id+'/item/'+item.id);
  andThen(function(){
    assert.equal(find('p.item-description').text().replace(/^\s+|\s+$/g, ''), 'a box...says "coca-cola" on the side.');
  });
});
