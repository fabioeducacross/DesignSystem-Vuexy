import mitt from 'mitt'

// Create a global event bus for player communication
// This ensures only one player can play at a time across the entire application
const playerEventBus = mitt()

export default playerEventBus
