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

  server.create('room', {description: 'a cold and scary place'});
  visit('/rooms/1');

  andThen(function() {
    assert.equal(find('p.room-description').text(), 'a cold and scary place');
    // ...
  });
});

test('visiting rooms in a cruel and infinite loop', function(assert) {
  server.create('room', {description: 'a cold and scary place', north: 2, south: 3});
  server.create('room', {description: 'northward!', south: 1, north: 3});
  server.create('room', {description: 'southward!', north: 1, south: 2});
  visit('/rooms/1');
  click('a:contains("N")');
  andThen(function() {
    assert.equal(find('p.room-description').text(), 'northward!');
  });
  click('a:contains("N")');
  andThen(function() {
    assert.equal(find('p.room-description').text(), 'southward!');
  });
  click('a:contains("N")');
  andThen(function() {
    assert.equal(find('p.room-description').text(), 'a cold and scary place');
  });
});

test('does not show nonexistent room links', function(assert){
  assert.expect(4);
  server.create('room', {description: 'a cold and scary place', north: 2});
  server.create('room', {description: 'northward!', south: 1});
  visit('/rooms/1');
  andThen(function(){
    assert.equal(find('a:contains("N")').length, 1);
    assert.equal(find('a:contains("W")').length, 0);
    assert.equal(find('a:contains("E")').length, 0);
    assert.equal(find('a:contains("S")').length, 0);
  });
});
