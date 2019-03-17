export const updateTileLevel = (row, col, level) => ({
  type: 'UPDATE_TILE_LEVEL',
  payload: {
    row, col, level
  }
})

export const updateTileLight = (row, col, shadowLevel) => {
  console.log(`will update light on row: ${row}, col: ${col}`)
  return ({
    type: 'UPDATE_TILE_LIGHT',
    payload: {
      row, col, shadowLevel
    }
  })
}

export const resetShadows = () => ({
  type: 'RESET_SHADOWS'
})

export const updateTileOwner = (row, col, owner) => ({
  type: 'UPDATE_TILE_OWNER',
  payload: {
    row, col, owner
  }
})