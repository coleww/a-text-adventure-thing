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
  assert.equal($.trim(this.$('.keys').text()), 'Keys: 0');
  Ember.run(function(){
    inventory.get('keys').pushObject({foo: 'bar'});
  });
  assert.equal($.trim(this.$('.keys').text()), 'Keys: 1');
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
