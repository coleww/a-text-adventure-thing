import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('key', {
  // Specify the other units that are required for this test.
  needs: ["model:item", "model:room", "model:thing"]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
