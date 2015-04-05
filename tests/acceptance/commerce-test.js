import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'a-dungeon-client/tests/helpers/start-app';

var application;

module('Acceptance: Commerce', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('a room can contain a merchant', function(assert){
  assert.expect(3);
  var thing = server.create('thing', {name: 'walrus', value: 5});
  var merchant = server.create('merchant', {name: 'grizzled marine biologist', description: 'HOWDY! Try some blubbery', things: [thing.id]});
  var room = server.create('room', {merchant: merchant.id});
  visit('/rooms/'+room.id);
  andThen(function(){
    assert.equal(find('a.merchant:contains("grizzled marine biologist")').size(), 1);
  });
  click('a.merchant');
  andThen(function(){
    assert.equal(find('p.greeting:contains("HOWDY! Try some blubbery)').size(), 1);
    assert.equal(find('a.thing:contains("walrus - 5 coins")').size(), 1);
  });
});

test('a merchant denies sale if you lack coins', function(assert){
  assert.expect(1);
  var thing = server.create('thing', {name: 'walrus', value: 5});
  var merchant = server.create('merchant', {name: 'a grizzled marine biologist', description: 'HOWDY! Try some blubbery', things: [thing.id]});
  var room = server.create('room', {merchant: merchant.id});
  visit('/rooms/'+room.id);
  click('a.merchant');
  click('a.thing');
  andThen(function(){
    assert.equal(find('div.messages').text().replace(/^\s+|\s+$/g, ''), 'You need more coins to buy that walrus!');
  });
});

test('a merchant sells things for coins', function(assert){
  assert.expect(4);
  var treasure = server.create('treasure', {value: 10, description: 'some coins'});
  var item = server.create('item', {treasure: treasure.id});
  var thing = server.create('thing', {name: 'walrus', value: 5});
  var merchant = server.create('merchant', {name: 'a grizzled marine biologist', description: 'HOWDY! Try some blubbery', things: [thing.id]});
  var room = server.create('room', {merchant: merchant.id, items: [item.id]});

  visit('/rooms/'+room.id+'/item/'+item.id);
  andThen(function(){
    assert.equal(find('.inventory .coin-count').text().replace(/^\s+|\s+$/g, '').replace(/\s+/g, " "), 'Coins: 0');
    assert.equal(find('.inventory .thing-count').text().replace(/^\s+|\s+$/g, '').replace(/\s+/g, " "), 'Things: 0');
  });
  click('a.treasure');
  visit('/rooms/'+room.id+'/merchant/'+merchant.id);
  click('a.thing');
  andThen(function(){
    assert.equal(find('.inventory .coin-count').text().replace(/^\s+|\s+$/g, '').replace(/\s+/g, " "), 'Coins: 5');
    assert.equal(find('.inventory .thing-count').text().replace(/^\s+|\s+$/g, '').replace(/\s+/g, " "), 'Things: 1');
  });
});

test('a merchant buys things with coins', function(assert){
  assert.expect(5);
  var thing = server.create('thing', {name: 'shiny', value: 10});
  var item = server.create('item', {things: [thing.id]});
  var merchant = server.create('merchant', {name: 'a grizzled marine biologist', description: 'HOWDY! Try some blubbery'});
  var room = server.create('room', {merchant: merchant.id, items: [item.id]});
  visit('/rooms/'+room.id+'/item/'+item.id);
  click('a.thing');
  andThen(function(){
    assert.equal(find('.inventory .coin-count').text().replace(/^\s+|\s+$/g, '').replace(/\s+/g, " "), 'Coins: 0');
    assert.equal(find('.inventory .thing-count').text().replace(/^\s+|\s+$/g, '').replace(/\s+/g, " "), 'Things: 1');
  });
  visit('/rooms/'+room.id+'/merchant/'+merchant.id);
  click('a.sell');
  andThen(function(){
    assert.equal(find('div.messages').text().replace(/^\s+|\s+$/g, ''), "What would you like to sell me?");
  });
  click('a:contains("shiny - 10 coins")');
  andThen(function(){
    assert.equal(find('.inventory .coin-count').text().replace(/^\s+|\s+$/g, '').replace(/\s+/g, " "), 'Coins: 10');
    assert.equal(find('.inventory .thing-count').text().replace(/^\s+|\s+$/g, '').replace(/\s+/g, " "), 'Things: 0');
  });
});

test('selling state stops if you do something else', function(assert){
  assert.expect(4);
  var thing = server.create('thing', {name: 'shiny', value: 10});
  var item = server.create('item', {things: [thing.id]});
  var merchant = server.create('merchant', {name: 'a grizzled marine biologist', description: 'HOWDY! Try some blubbery'});
  var room = server.create('room', {merchant: merchant.id, items: [item.id]});
  visit('/rooms/'+room.id+'/item/'+item.id);
  click('a.thing');
  visit('/rooms/'+room.id+'/merchant/'+merchant.id);
  click('a.sell');
  andThen(function(){
    assert.equal(find('div.messages').text().replace(/^\s+|\s+$/g, ''), "What would you like to sell me?");
    assert.equal(find('a:contains("shiny - 10 coins")').size(), 1);
  });
  click('a.back');
  andThen(function(){
    assert.equal(find('div.messages').text().replace(/^\s+|\s+$/g, ''), "");
    assert.equal(find('a:contains("shiny - 10 coins")').size(), 0);
  });
});
