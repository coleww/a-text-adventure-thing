import DS from 'ember-data';

export default DS.Model.extend({
  room: DS.belongsTo('room', {async: true})
});
