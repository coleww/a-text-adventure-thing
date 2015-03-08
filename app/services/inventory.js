import Ember from 'ember';

export default Ember.Object.extend({
  things: Ember.A(),
  keys: Ember.A(),
  coins: 0,
  message: "", // TODO: this should be it's own object...thing...
  hasKey: function(room_id){
    return this.get('keys').any(function(key){
      return key.get("room_id") === room_id;
    });
  }
});
