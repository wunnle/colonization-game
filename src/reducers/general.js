const initialState = {
  gameStarted: false
}


export default function general(state = initialState, action) {
  switch (action.type) {
    case 'START_GAME':
    return {
      ...state,
      gameStarted: true
    }


    default:
    return state
  }
}