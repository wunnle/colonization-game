

const initialState = {
  turn: 0,
  wholeTurn: 0,
  activePlayer: 1,
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

    default:
      return state
  }
}