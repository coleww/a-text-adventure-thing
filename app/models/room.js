import DS from 'ember-data';

var Room = DS.Model.extend({
  north: DS.belongsTo('room', {inverse: 'south', async: true}),
  south: DS.belongsTo('room', {inverse: 'north', async: true}),
  east: DS.belongsTo('room', {inverse: 'west', async: true}),
  west: DS.belongsTo('room', {inverse: 'east', async: true}),
  description: DS.attr('string'),
  name: DS.attr('string'),
  items: DS.hasMany('item', {async: true}),
  locked: DS.attr('boolean', {defaultValue: false})
});

Room.reopenClass({
  FIXTURES: [
    {
      id: 1,
      description: 'in the center of a quiet town',
      name: 'home',
      north: 2,
      south: 3,
      east: 4,
      west: 5,
      items: [1]
    },
    {
      id: 2,
      description: 'at the entrance to town...',
      name: 'main gate',
      south: 1,
      north: 3
    },
    {
      id: 3,
      description: 'staring at the edge of the planet. You feel deja vu.',
      name: 'main road',
      north: 1,
      south: 2,
      items: [3]
    },
    {
      id: 4,
      description: 'resting in a lovely garden surrounded by walls.',
      name: 'inner gate',
      west: 1,
      south: 6,
      merchant: 1
    },
    {
      id: 5,
      description: 'surrounded by garbage as far as the eye can see.',
      name: 'junkyard',
      east: 1,
      items: [2]
    },
    {
      id: 6,
      description: 'in a shed',
      name: 'a locked shed',
      north: 4,
      locked: true
    }
  ]
});

export default Room;
