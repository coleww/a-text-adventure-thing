import Ember from 'ember';

export default Ember.Route.extend({
  inventory: Ember.inject.service('inventory'),
  model: function(params){
    return this.store.find('room', params.room_id);
  },
  afterModel: function(model, transition){
    if(model.get('locked')){
      this.get('inventory').set('message', 'You need a key to get in there!');
      transition.abort();
    }
  }
});
