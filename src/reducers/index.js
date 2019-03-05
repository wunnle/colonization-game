import { combineReducers } from 'redux'
import general from './general'
import players from './players'


const rootReducer = () => combineReducers({
  general,
  players
})

export default rootReducer