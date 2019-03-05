export const increaseEnergy = (playerId, increaseBy) => ({
  type: 'INCREASE_ENERGY',
  payload: {
    playerId,
    increaseBy
  }
})

export const reduceEnergy = (playerId, reduceBy) => ({
  type: 'REDUCE_ENERGY',
  payload: {
    playerId,
    reduceBy
  }
})