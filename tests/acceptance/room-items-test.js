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

test('links back to parent room', function(assert){
  assert.expect(2);
  var item = server.create('item');
  var room = server.create('room', {name: 'darkness', items: [item.id]});
  visit('/rooms/'+room.id+'/item/'+item.id);
  andThen(function(){
    assert.equal(find('a.back').text(), 'back');
    assert.equal(find('a.back').attr('href'), '/rooms/'+room.id);
  });
});

test('shows keys hidden in that item', function(assert){
  assert.expect(4);
  var key = server.create('key', {description: 'a rusty old key with a peace sign etched into it'});
  var item = server.create('item', {key: key.id});
  var room = server.create('room', {description: 'gazing into the abyss', items: [item.id]});
  visit('/rooms/'+room.id+'/item/'+item.id);
  andThen(function(){
    assert.equal(find('.inventory .key-count').text().replace(/^\s+|\s+$/g, '').replace(/\s+/g, " "), 'Keys: 0');
    assert.equal(find('a.key').text().replace(/^\s+|\s+$/g, ''), 'a rusty old key with a peace sign etched into it');
  });
  click('a.key');
  andThen(function(){
    assert.equal(find('a.key').size(), 0);
    assert.equal(find('.inventory .key-count').text().replace(/^\s+|\s+$/g, '').replace(/\s+/g, " "), 'Keys: 1');
  });
});

test('shows things hidden in that item', function(assert){
  assert.expect(5);
  var thing = server.create('thing', {name: 'some sort of tool or treasure or idk'});
  var item = server.create('item', {things: [thing.id]});
  var room = server.create('room', {items: [item.id]});
  visit('/rooms/'+room.id+'/item/'+item.id);
  andThen(function(){
    assert.equal(find('.inventory .thing-count').text().replace(/^\s+|\s+$/g, '').replace(/\s+/g, " "), 'Things: 0');
    assert.equal(find('a.thing').text().replace(/^\s+|\s+$/g, ''), 'some sort of tool or treasure or idk');
  });
  click('a.thing');
  andThen(function(){
    assert.equal(find('a.thing').size(), 0);
    assert.equal(find('ul.things li').text().replace(/^\s+|\s+$/g, ''), 'some sort of tool or treasure or idk');
    assert.equal(find('.inventory .thing-count').text().replace(/^\s+|\s+$/g, '').replace(/\s+/g, " "), 'Things: 1');
  });
});
