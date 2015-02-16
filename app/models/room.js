import DS from 'ember-data';

export default DS.Model.extend({
  north: DS.belongsTo('room', {inverse: 'south'}),
  south: DS.belongsTo('room', {inverse: 'north'}),
  east: DS.belongsTo('room', {inverse: 'west'}),
  west: DS.belongsTo('room', {inverse: 'east'}),
  description: DS.attr()
});
