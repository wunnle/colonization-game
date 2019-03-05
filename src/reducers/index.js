import { combineReducers } from 'redux'
import general from './general'
import players from './players'
import game from './game'
import board from './board'


const rootReducer = () => combineReducers({
  general,
  players,
  game,
  board
})

export default rootReducer