import Ember from 'ember';

export default Ember.Route.extend({
  inventory: Ember.inject.service('inventory'),
  model: function(params){
    return this.store.find('room', params.room_id);
  },
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
      this.get('inventory').set('selling', false);
    }
  }
});
