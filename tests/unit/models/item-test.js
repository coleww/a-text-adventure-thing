import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('item', {
  // Specify the other units that are required for this test.
  needs: ["model:room", "model:key", "model:thing"]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
