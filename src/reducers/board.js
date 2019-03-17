import update from 'immutability-helper';

const defaultRowProp = {
  level: null,
  owner: '',
  shadowLevel: 0
}

const numberOfCols = 6

const initialState = {
  1: {
    name: '1',
    props: new Array(numberOfCols).fill(null).map(() => ({ ...defaultRowProp }))
  },
  2: {
    name: '2',
    props: new Array(numberOfCols).fill(null).map(() => ({ ...defaultRowProp }))
  },
  3: {
    name: '3',
    props: new Array(numberOfCols).fill(null).map(() => ({ ...defaultRowProp }))
  },
  4: {
    name: '4',
    props: new Array(numberOfCols).fill(null).map(() => ({ ...defaultRowProp }))
  },
  5: {
    name: '5',
    props: new Array(numberOfCols).fill(null).map(() => ({ ...defaultRowProp }))
  },
  6: {
    name: '6',
    props: new Array(numberOfCols).fill(null).map(() => ({ ...defaultRowProp }))
  }
}


export default function general(state = initialState, action) {
  switch (action.type) {

    case 'UPDATE_TILE_LEVEL':

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


    case 'UPDATE_TILE_LIGHT':

      return {
        ...state,
        [action.payload.row]: {
          ...state[action.payload.row],
          props: update(state[action.payload.row].props, {
            [action.payload.col - 1]: {
              shadowLevel: {
                $set: action.payload.shadowLevel
              }
            }
          })
        }
      }

    default:
      return state
  }
}