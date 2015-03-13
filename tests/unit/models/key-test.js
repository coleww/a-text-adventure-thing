import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('key', {integration: true});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
