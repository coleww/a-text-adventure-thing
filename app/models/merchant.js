import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  description: DS.attr(),
  things: DS.hasMany('thing', {async: true})
});
