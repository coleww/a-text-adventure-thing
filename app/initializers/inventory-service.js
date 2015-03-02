export function initialize(container, application) {
  application.inject('route', 'inventoryService', 'service:inventory');
}

export default {
  name: 'inventory-service',
  initialize: initialize
};
