import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('room', {path: 'rooms/:room_id'}, function(){
    this.route('item', {path: 'item/:item_id'});
    this.route('merchant', {path: 'merchant/:merchant_id'});
  });
});

export default Router;
