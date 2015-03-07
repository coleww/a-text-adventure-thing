import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['inventory'],
  numKeys: Ember.computed.oneWay('inventory.keys.length'),

  actions: {
    showThing: function(thing){
      this.get('inventory').set('message', 'A '+thing.get('name')+' - '+thing.get('description'));
    }
  }
});
