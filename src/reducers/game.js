

const initialState = {
  turn: 0,
  wholeTurn: 0,
  activePlayer: 1,
  sunDirection: 'right',
  notificationMessage: '',
}


export default function general(state = initialState, action) {
  switch (action.type) {
    case 'END_TURN':
      return {
        ...state,
        turn: state.turn + 0.5,
        wholeTurn: Math.floor(state.turn + 0.5),
        activePlayer: state.activePlayer === 1 ? 2 : 1
      }

    case 'POP_NOTIFICATION':
      return {
        ...state,
        notificationMessage: action.payload.message
      }

    case 'ROTATE_SUN':
      return {
        ...state,
        sunDirection: action.payload.sunDirection
      }

    default:
      return state
  }
}