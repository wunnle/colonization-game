export const endTurn = () => ({
  type: 'END_TURN'
})

export const popNotification = message => ({
  type: 'POP_NOTIFICATION',
  payload: {
    message
  }
})

export const rotateSun = (sunDirection) => ({
  type: 'ROTATE_SUN',
  payload: {
    sunDirection
  }
})