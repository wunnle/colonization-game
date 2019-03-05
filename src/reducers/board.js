import update from 'immutability-helper';

const defaultRowProp = {
  level: null,
  owner: '',
  isBright: true
}

const initialState = {
  a: {
    name: 'a',
    props: new Array(4).fill(null).map(() => ({ ...defaultRowProp }))
  },
  b: {
    name: 'b',
    props: new Array(4).fill(null).map(() => ({ ...defaultRowProp }))
  },
  c: {
    name: 'c',
    props: new Array(4).fill(null).map(() => ({ ...defaultRowProp }))
  },
  d: {
    name: 'd',
    props: new Array(4).fill(null).map(() => ({ ...defaultRowProp }))
  }
}


export default function general(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_TILE_LEVEL':

    console.log(action.payload.row, '🤟', state[action.payload.row], state)

      return {
        ...state,
        [action.payload.row]: {
          ...state[action.payload.row],
          props: update(state[action.payload.row].props, {
            [action.payload.col - 1]: {
              level: {
                $set: action.payload.level
              }
            }
          })
        }
      }

    case 'UPDATE_TILE_OWNER':

      return {
        ...state,
        [action.payload.row]: {
          ...state[action.payload.row],
          props: update(state[action.payload.row].props, {
            [action.payload.col - 1]: {
              owner: {
                $set: action.payload.owner
              }
            }
          })
        }
      }

    default:
      return state
  }
}