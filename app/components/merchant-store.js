import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    buy: function(thing){
      this.sendAction('buy', thing);
    },
    sell: function(){
      this.sendAction('sell');
    }
  }
});
