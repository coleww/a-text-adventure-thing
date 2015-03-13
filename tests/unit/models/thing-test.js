import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('thing', {integration: true});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
