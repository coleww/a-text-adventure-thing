import DS from 'ember-data';

var Item = DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  room: DS.belongsTo('room', {async: true}), //necessary?
  key: DS.belongsTo('key', {async: true}),
  things: DS.hasMany('thing', {async: true})
});

Item.reopenClass({
  FIXTURES: [
    {
      id: 1,
      name: 'a lumpy bag',
      description: 'smells like weed',
      room: 1,
      key: 1
    },
    {
      id: 2,
      name: 'a dirty jacket',
      description: 'covered in beetles',
      room: 5,
      things: [1]
    },
    {
      id: 3,
      name: 'an old boot',
      description: 'someone took a bite out of it',
      room: 3,
      things: [2]
    }
  ]
});

export default Item;
