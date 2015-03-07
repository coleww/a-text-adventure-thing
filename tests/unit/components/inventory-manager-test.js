import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('inventory-manager', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('it shows key count', function(assert) {
  assert.expect(2);

  var component = this.subject();
  var inventory = Ember.Object.create({
    keys: Ember.A()
  });
  component.set('inventory', inventory);
  assert.equal($.trim(this.$('.key-count').text().replace(/\s+/g, " ")), 'Keys: 0');
  Ember.run(function(){
    inventory.get('keys').pushObject({foo: 'bar'});
  });
  assert.equal($.trim(this.$('.key-count').text().replace(/\s+/g, " ")), 'Keys: 1');
});

test('it shows things', function(assert) {
  assert.expect(1);

  var component = this.subject();
  var inventory = Ember.Object.create({
    things: Ember.A([{name: 'bar'}])
  });
  component.set('inventory', inventory);
  assert.equal($.trim(this.$('.thing').text()), 'bar');
});

test('it shows details about a thing', function(assert) {
  assert.expect(1);

  var component = this.subject();
  var thing = Ember.Object.create({name: 'bar', description: 'where everybody knows your name'});
  var inventory = Ember.Object.create({
    things: Ember.A([thing])
  });
  component.set('inventory', inventory);
  this.$('.thing a').click();
  assert.equal($.trim(this.$('.messages').text()), 'A bar - where everybody knows your name');
});

test('it shows details about keys', function(assert) {
  assert.expect(1);

  var component = this.subject();
  var key = Ember.Object.create({description: 'big iron key', room_id: 1});
  var inventory = Ember.Object.create({
    keys: Ember.A([key])
  });
  component.set('inventory', inventory);
  this.$('.key-count a').click();
  assert.equal($.trim(this.$('.key').text()), '#1: big iron key');
});

test('it switches between key and thing views', function(assert) {
  assert.expect(4);

  var component = this.subject();
  var key = Ember.Object.create({description: 'big iron key', room_id: 1});
  var thing = Ember.Object.create({name: 'bar'});
  var inventory = Ember.Object.create({
    keys: Ember.A([key]),
    things: Ember.A([thing])
  });
  component.set('inventory', inventory);
  this.$('.key-count a').click();
  assert.equal($.trim(this.$('.key').text()), '#1: big iron key');
  assert.ok(this.$('.key-count a').hasClass('inventory-active'));
  this.$('.thing-count a').click();
  assert.equal($.trim(this.$('.thing').text()), 'bar');
  assert.ok(this.$('.thing-count a').hasClass('inventory-active'));
});

test('it shows message if no keys or things', function(assert) {
  assert.expect(2);

  var component = this.subject();
  var inventory = Ember.Object.create({
    keys: Ember.A(),
    things: Ember.A()
  });
  component.set('inventory', inventory);
  this.$('.key-count a').click();
  assert.equal($.trim(this.$('.key').text()), 'Empty...');
  this.$('.thing-count a').click();
  assert.equal($.trim(this.$('.thing').text()), 'Empty...');
});
