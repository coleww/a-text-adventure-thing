import Ember from 'ember';

export default Ember.Object.extend({
  init: function(){
    this._super();
    this.set('things', Ember.A());
    this.set('keys', Ember.A());
  },
  things: null,
  keys: null,
  coins: 0,
  message: "", // TODO: this should be it's own object...thing...
  selling: false,
  hasKey: function(room_id){
    return this.get('keys').any(function(key){
      return key.get("room_id") === room_id;
    });
  }
});
