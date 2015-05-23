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

  visit('/rooms/1');

  andThen(function() {
    assert.equal(find('p.room-description').text().replace(/\s+/g, " "), 'you are in the center of a quiet town. you see a lumpy bag. ');
    // ...
  });
});

test('visiting rooms in a cruel and infinite loop', function(assert) {
  visit('/rooms/1');
  click('a.north');
  andThen(function() {
    assert.equal(find('p.room-description').text().replace(/\s+/g, " "), 'you are at the entrance to town.... ');
  });
  click('a.north');
  andThen(function() {
    assert.equal(find('p.room-description').text().replace(/\s+/g, " "), 'you are staring at the edge of the planet. You feel deja vu.. you see an old boot. ');
  });
  click('a.north');
  andThen(function() {
    assert.equal(find('p.room-description').text().replace(/\s+/g, " "), 'you are in the center of a quiet town. you see a lumpy bag. ');
  });
});

test('does not show nonexistent room links', function(assert){
  assert.expect(4);
  visit('/rooms/5');
  andThen(function(){
    assert.equal(find('a.north').length, 0);
    assert.equal(find('a.west').length, 0);
    assert.equal(find('a.east').length, 1);
    assert.equal(find('a.south').length, 0);
  });
});

test('shows brief name of linked rooms', function(assert){
  assert.expect(3);
  visit('/rooms/1');
  andThen(function(){
    assert.equal(find('a.north:contains("main gate")').length, 1);
    assert.equal(find('a.south:contains("main road")').length, 1);
  });
  click('a.north');
  andThen(function(){
    assert.equal(find('a.south:contains("home")').length, 1);
  });
});

test('room is inaccessible without its key', function(assert){
  assert.expect(3);
  visit('/rooms/4');
  click('a.south');
  andThen(function(){
    assert.equal(find('p.room-description').text().replace(/\s+/g, " "), 'you are resting in a lovely garden surrounded by walls.. ');
    assert.equal(find('div.messages').text().replace(/^\s+|\s+$/g, ''), 'You need a key to get in there!');
  });
  click('a.west');
  click('a.item');
  click('a.key');
  click('a.east');
  click('a.south');
  andThen(function(){
    assert.equal(find('p.room-description').text().replace(/\s+/g, " "), 'you are in a shed. ');
  });
});

test('locked room messages go away', function(assert){
  assert.expect(3);
  visit('/rooms/4');
  click('a.south');
  andThen(function(){
    assert.equal(find('p.room-description').text().replace(/\s+/g, " "), 'you are resting in a lovely garden surrounded by walls.. ');
    assert.equal(find('div.messages').text().replace(/^\s+|\s+$/g, ''), 'You need a key to get in there!');
  });
  click('a.west');
  andThen(function(){
    assert.equal(find('div.messages').text().replace(/^\s+|\s+$/g, ''), '');
  });
});