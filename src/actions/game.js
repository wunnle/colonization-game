export const endTurn = () => ({
  type: 'END_TURN'
})

export const popNotification = message => ({
  type: 'POP_NOTIFICATION',
  payload: {
    message
  }
})