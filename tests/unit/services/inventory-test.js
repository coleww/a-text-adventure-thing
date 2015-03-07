import {
  moduleFor,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleFor('service:inventory', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('it exists', function(assert) {
  var service = this.subject();
  assert.ok(service);
});

test('it finds keys to room_ids', function(assert) {
  var service = this.subject();
  var key = Ember.Object.create({room_id: 1});
  service.get('keys').pushObject(key);
  assert.ok(service.hasKey(1));
  assert.ok(!service.hasKey(2));
});