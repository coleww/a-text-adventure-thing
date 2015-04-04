import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['inventory'],
  numKeys: Ember.computed.oneWay('inventory.keys.length'),
  hasKeys: Ember.computed.bool('numKeys'),

  numThings: Ember.computed.oneWay('inventory.things.length'),
  hasThings: Ember.computed.bool('numThings'),
  showingKeys: false,
  showingThings: Ember.computed.not('showingKeys'),

  numCoins: Ember.computed.alias('inventory.coins'),

  selling: Ember.computed.alias('inventory.selling'),

  actions: {
    showThing: function(thing){
      this.get('inventory').set('message', 'A '+thing.get('name')+' - '+thing.get('description'));
    },
    showKeys: function(){
      this.set('showingKeys', true);
    },
    showThings: function(){
      this.set('showingKeys', false);
    },
    sellThing: function(thing){
      this.get('inventory').incrementProperty('coins', thing.get('value'));
      this.get('inventory.things').removeObject(thing);
      this.set('selling', false);
    }
  }
});
