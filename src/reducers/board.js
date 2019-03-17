import update from 'immutability-helper';

const defaultRowProp = {
  level: null,
  owner: '',
  shadowLevel: 0
}

const numberOfCols = 6
const numberOfRows = 6

const initialState = new Array(numberOfRows).fill(null).map(() => new Array(numberOfCols).fill(null).map(() => ({ ...defaultRowProp })))

console.log({ initialState })


export default function general(state = initialState, action) {
  switch (action.type) {

    case 'UPDATE_TILE_LEVEL':

      return [...state.map((row, rowIndex) => {
        if (rowIndex === action.payload.row - 1) {
          return row.map((tile, colIndex) => {
            if (colIndex === action.payload.col - 1) {
              tile.level = action.payload.level
            }
            return tile
          })
        } else {
          return row
        }
      })]

    case 'UPDATE_TILE_OWNER':

      return [...state.map((row, rowIndex) => {
        if (rowIndex === action.payload.row - 1) {
          return row.map((tile, colIndex) => {
            if (colIndex === action.payload.col - 1) {
              tile.owner = action.payload.owner
            }
            return tile
          })
        } else {
          return row
        }
      })]


    case 'UPDATE_TILE_LIGHT':

      return [...state.map((row, rowIndex) => {
        if (rowIndex === action.payload.row - 1) {
          return row.map((tile, colIndex) => {
            if (colIndex === action.payload.col - 1) {
              tile.shadowLevel = action.payload.shadowLevel
            }
            return tile
          })
        } else {
          return row
        }
      })]

    case 'RESET_SHADOWS':

      return [...state.map(row => {
        return row.map(tile => {
          tile.shadowLevel = 0
          return tile
        })
      })]

    default:
      return state
  }
}