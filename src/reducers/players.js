const initialState = {
  1: {
    name: 'blue',
    energy: 2
  },
  2: {
    name: 'red',
    energy: 2
  }
}


export default function general(state = initialState, action) {
  switch (action.type) {
    case 'INCREASE_ENERGY':
      return {
        ...state,
        [action.payload.playerId]: {
          ...state[action.payload.playerId],
          energy: state[action.payload.playerId].energy + action.payload.increaseBy
        }
      }

      case 'REDUCE_ENERGY':
      console.log({action})
      return {
        ...state,
        [action.payload.playerId]: {
          ...state[action.payload.playerId],
          energy: state[action.payload.playerId].energy - action.payload.reduceBy
        }
      }

    default:
      return state
  }
}