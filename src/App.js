import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import { startGame } from './actions/general'
import { increaseEnergy, reduceEnergy } from './actions/players'
import { updateTileLevel, updateTileOwner } from './actions/board'
import { endTurn } from './actions/game'
import Tile from './components/tile'

import './App.css';

const defaultRowProp = {
  level: null,
  owner: ''
}

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(startGame())
  }

  createTileRow = (data) => {
    console.log({data})

    const row = Array(3)
    data.props.forEach((props, i) => {
      row[i] = <Tile {...props} key={data.name + (i+1)} col={i+1} row={data.name} 
      handleClick={() => this.handleRowClick({col: (i+1), row: data.name, owner: props.owner })} />
    })

    return row
  }
  handleEndTurnClick = () => {
    this.props.dispatch(endTurn())
  }

  getUpgradeCost = (level) => {
    switch (level) {
      case 0:
        return 1
      case 1:
        return 2
      case 2:
        return 3
    
      default:
        return 1
    }
  }

  reduceEnergyOfActivePlayer = reduceBy => this.props.dispatch(reduceEnergy(this.props.activePlayerId, reduceBy))

  handleRowClick = ({col, row, owner}) => {

    const { board, players, dispatch, turn, activePlayerId, activePlayer } = this.props

    const updateClickedTileLevel = level => dispatch(updateTileLevel(row, col, level)) 
    const updateClickedTileOwner = owner => dispatch(updateTileOwner(row, col, owner))

    if(owner && activePlayer.name !== owner) {
      console.warn('invalid move! 💀')
      return
    }

    if(turn < 1) {

      updateClickedTileLevel(1)
      updateClickedTileOwner(activePlayer.name)
      this.handleEndTurnClick()
      return
    }

    const currentLevel = board[row].props[col - 1].level

    if(currentLevel < 3) {

      const currentLevel = board[row].props[col - 1].level

      const currentEnergy = activePlayer.energy

      const upgradeCost = this.getUpgradeCost(currentLevel)

      if(currentEnergy >= upgradeCost) {
        updateClickedTileLevel(board[row].props[col - 1].level + 1)
        updateClickedTileOwner(activePlayer.name)
        this.reduceEnergyOfActivePlayer(upgradeCost)
      } else {
        console.warn('not enough ⚡')
      }

    }
  }

  render() {

    const { gameStarted, players, wholeTurn, activePlayer, board } = this.props
    const { createTileRow, handleEndTurnClick } = this


    return (
      <div className="App">
        <header>
        <p>Season {wholeTurn} </p>
        {gameStarted && <h1>Turn of {activePlayer.name} player</h1>}
        <p>⚡ {activePlayer.energy}</p>
        <button onClick={handleEndTurnClick}>End turn</button>
        </header>
        <div className="board-holder">
        <div className="board">
          {createTileRow(board.a)}
          {createTileRow(board.b)}
          {createTileRow(board.c)}
          {createTileRow(board.d)}
        </div>
        <div className="sun"></div>
        </div>
        
      </div>
    );
  }
}


const mapStateToProps = function ({ general, players, game, board }) {
  return {
    board,
    gameStarted: general.gameStarted,
    players,
    player1: players[1],
    player2: players[2],
    activePlayer: players[game.activePlayer],
    activePlayerId: game.activePlayer,
    turn: game.turn,
    wholeTurn: game.wholeTurn
  }
}

export default connect(mapStateToProps)(App);
