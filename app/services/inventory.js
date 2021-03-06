import Ember from 'ember';

export default Ember.Object.extend({
  init: function(){
    this._super();
    this.set('things', Ember.A());
    this.set('keys', Ember.A());
  },
  things: null,
  keys: null,
  message: "", // TODO: this should be it's own object...thing...
  hasKey: function(room_id){
    return this.get('keys').any(function(key){
      return key.get("room_id") === +room_id;
    });
  }
});
