import DS from 'ember-data';

var Thing = DS.Model.extend({
  name: DS.attr(),
  description: DS.attr()
});

Thing.reopenClass({
  FIXTURES: [
    {
      id: 1,
      name: 'potato',
      description: 'suitable replacement for a football'
    },
    {
      id: 2,
      name: 'hot cake',
      description: 'it is...pretty hot i guess'
    }
  ]
});

export default Thing;