import DS from 'ember-data';

export default DS.Model.extend({
  north: DS.belongsTo('room', {inverse: 'south', async: true}),
  south: DS.belongsTo('room', {inverse: 'north', async: true}),
  east: DS.belongsTo('room', {inverse: 'west', async: true}),
  west: DS.belongsTo('room', {inverse: 'east', async: true}),
  description: DS.attr('string'),
  name: DS.attr('string'),
  items: DS.hasMany('item', {async: true}),
  locked: DS.attr('boolean', {defaultValue: false}),
  merchant: DS.belongsTo('merchant', {async: true})
});
