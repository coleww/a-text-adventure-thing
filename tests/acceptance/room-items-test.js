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
  visit('/rooms/1');
  var expected = 'you are in the center of a quiet town. you see a lumpy bag. ';
  andThen(function(){
    assert.equal(find('p.room-description').text().replace(/\s+/g, " "), expected);
    assert.equal(find('a.item').text(), 'a lumpy bag');
  });
});

test('shows "content" of that item', function(assert){
  assert.expect(1);
  visit('/rooms/1/item/1');
  andThen(function(){
    assert.equal(find('p.item-description').text().replace(/^\s+|\s+$/g, ''), 'a lumpy bag...smells like weed');
  });
});

test('links back to parent room', function(assert){
  assert.expect(2);
  visit('/rooms/1/item/1');
  andThen(function(){
    assert.equal(find('a.back').text(), 'back');
    assert.equal(find('a.back').attr('href'), '/rooms/1');
  });
});

test('shows keys hidden in that item', function(assert){
  assert.expect(4);
  visit('/rooms/1/item/1');
  andThen(function(){
    assert.equal(find('.inventory .key-count').text().replace(/^\s+|\s+$/g, '').replace(/\s+/g, " "), 'Keys: 0');
    assert.equal(find('a.key').text().replace(/^\s+|\s+$/g, ''), 'a key');
  });
  click('a.key');
  andThen(function(){
    assert.equal(find('a.key').size(), 0);
    assert.equal(find('.inventory .key-count').text().replace(/^\s+|\s+$/g, '').replace(/\s+/g, " "), 'Keys: 1');
  });
});

test('shows things hidden in that item', function(assert){
  assert.expect(5);
  visit('/rooms/5/item/2');
  andThen(function(){
    assert.equal(find('.inventory .thing-count').text().replace(/^\s+|\s+$/g, '').replace(/\s+/g, " "), 'Things: 0');
    assert.equal(find('a.thing').text().replace(/^\s+|\s+$/g, ''), 'potato');
  });
  click('a.thing');
  andThen(function(){
    assert.equal(find('a.thing').size(), 0);
    assert.equal(find('ul.things li').text().replace(/^\s+|\s+$/g, ''), 'potato');
    assert.equal(find('.inventory .thing-count').text().replace(/^\s+|\s+$/g, '').replace(/\s+/g, " "), 'Things: 1');
  });
});