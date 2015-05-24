import Ember from 'ember';

export default Ember.Route.extend({
  inventory: Ember.inject.service('inventory'),
  afterModel: function(model, transition){
    var inventory = this.get('inventory');
    if(model.get('locked') && !inventory.hasKey(model.get('id'))){
      inventory.set('message', 'You need a key to get in there!');
      transition.abort();
    }
  },
  actions: {
    didTransition: function(){
      this.get('inventory').set('message', '');
    },
    takeKey: function(key){
      this.get("inventory.keys").pushObject(key);
      this.currentModel.set("key", null);
    },
    takeThing: function(thing){
      this.get("inventory.things").pushObject(thing);
      this.currentModel.get("things").removeObject(thing);
    }
  }
});
