import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  description: 'a cold and scary place',
  name: 'door',
  north: null,
  west: null,
  south: null,
  east: null,
  locked: false
});