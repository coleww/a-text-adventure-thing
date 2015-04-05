import Ember from 'ember';

export default Ember.Route.extend({
  inventory: Ember.inject.service('inventory'),
  model: function(params){
    return Ember.RSVP.hash({
      merchant: this.store.find('merchant', params.merchant_id),
      room: this.modelFor('room')
    });
  },
  actions: {
    buy: function(thing){
      if(this.get('inventory.coins') < thing.get('value')){
        this.get('inventory').set('message', 'You need more coins to buy that '+thing.get('name')+'!');
      } else {
        this.get('inventory').decrementProperty('coins', thing.get('value'));
        this.get('inventory.things').pushObject(thing);
      }
    },
    sell: function(){
      if(this.get('inventory.hasThings')){
        this.get('inventory').setProperties({
          message: 'What would you like to sell me?',
          selling: true
        });
      }
    }
  }
});
