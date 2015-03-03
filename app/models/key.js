import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  item: DS.belongsTo('item', {async: true})
});
