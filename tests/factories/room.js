import EP from 'ember-pretenderify';

export default EP.Factory.extend({
  description: 'a cold and scary place',
  name: 'door',
  north: null,
  west: null,
  south: null,
  east: null,
  item_ids: []
});