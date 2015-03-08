import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  room_id: DS.attr('string')
});
