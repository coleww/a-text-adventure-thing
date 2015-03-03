import Ember from 'ember';

export default Ember.Route.extend({
  inventory: Ember.inject.service('inventory'),
  model: function(params){
    return this.store.find('item', params.item_id);
  },
  setupController: function(controller, model){
    controller.set('model', model);
    controller.set('room', this.modelFor('room'));
  },
  actions: {
    takeKey: function(key){
      this.get("inventory.keys").pushObject(key);
      this.currentModel.set("key", null);
    }
  }
});
