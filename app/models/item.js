import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  room: DS.belongsTo('room', {async: true}), //necessary?
  key: DS.belongsTo('key', {async: true}),
  things: DS.hasMany('thing', {async: true}),
  treasure: DS.belongsTo('treasure', {async: true})
});
