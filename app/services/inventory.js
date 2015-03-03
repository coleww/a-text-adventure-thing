import Ember from 'ember';

export default Ember.Object.extend({
  stuff: Ember.A(["a ball of yarn", "eleven macadamia nuts"]),
  keys: Ember.A(),
  message: ""// TODO: this should be it's own object...thing...
});
