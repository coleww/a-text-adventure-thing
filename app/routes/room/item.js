import Ember from 'ember';

export default Ember.Route.extend({
  inventory: Ember.inject.service('inventory'),
  model: function(params){
    return Ember.RSVP.hash({
      item: this.store.find('item', params.item_id),
      room: this.modelFor('room')
    });
  },
  actions: {
    takeKey: function(key){
      this.get("inventory.keys").pushObject(key);
      this.currentModel.item.set("key", null);
    },
    takeThing: function(thing){
      this.get("inventory.things").pushObject(thing);
      this.currentModel.item.get("things").removeObject(thing);
    }
  }
});
