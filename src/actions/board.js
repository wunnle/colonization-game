export const updateTileLevel = (row, col, level) => ({
  type: 'UPDATE_TILE_LEVEL',
  payload: {
    row, col, level
  }
})

export const updateTileOwner = (row, col, owner) => ({
  type: 'UPDATE_TILE_OWNER',
  payload: {
    row, col, owner
  }
})