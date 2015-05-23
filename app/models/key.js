import DS from 'ember-data';

var Key = DS.Model.extend({
  description: DS.attr('string'),
  room_id: DS.attr('number')
});

Key.reopenClass({
  FIXTURES: [
    {
      id: 1,
      description: "a key",
      room_id: 6
    }
  ]
});

export default Key;
