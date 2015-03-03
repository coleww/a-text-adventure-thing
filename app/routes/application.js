import Ember from 'ember';

export default Ember.Route.extend({
  inventory: Ember.inject.service('inventory'),
  model: function(){
    // get user inventory data from server?
    // or user object == inventory?
  },
  setupController: function(controller){
    controller.set('inventory', this.get('inventory'));
}
});
