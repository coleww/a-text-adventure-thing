import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['inventory'],
  numKeys: Ember.computed.oneWay('inventory.keys.length')
});
