import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import { startGame } from './actions/general'
import { increaseEnergy, reduceEnergy } from './actions/players'
import { endTurn } from './actions/game'
import Tile from './components/tile'

import './App.css';

const defaultRowProp = {
  level: null,
  owner: ''
}

class App extends Component {
  state = {
    rowProps: {
      a: {
        name: 'a',
        props: new Array(4).fill(null).map(()=> ({...defaultRowProp}))
      }, 
      b: {
        name: 'b',
        props: new Array(4).fill(null).map(()=> ({...defaultRowProp}))
      }, 
      c: {
        name: 'c',
        props: new Array(4).fill(null).map(()=> ({...defaultRowProp}))
      }, 
      d: {
        name: 'd',
        props: new Array(4).fill(null).map(()=> ({...defaultRowProp}))
      }, 
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(startGame())
    console.log(this.state.rowProps)
  }

  createTileRow = (data) => {
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

  handleRowClick = ({col, row, owner}) => {

    let { rowProps } = this.state
    const { players, dispatch, turn, activePlayerId, activePlayer } = this.props

    let validMove = false
    if(owner && activePlayer.name !== owner) {
      console.warn('invalid move!')
      return
    }

    if(turn < 1) {
      rowProps[row].props[col - 1].level = 1
      rowProps[row].props[col - 1].owner = activePlayer.name

      this.setState({rowProps})
      this.handleEndTurnClick()
      return
    }

    const currentLevel = rowProps[row].props[col - 1].level

    if(currentLevel < 3) {

      const currentLevel = rowProps[row].props[col - 1].level
      console.log({currentLevel})

      const currentEnergy = activePlayer.energy
      console.log(currentEnergy)

      const upgradeCost = this.getUpgradeCost(currentLevel)

      console.log(upgradeCost)

      if(currentEnergy >= upgradeCost) {
        rowProps[row].props[col - 1].level++
        rowProps[row].props[col - 1].owner = activePlayer.name
        dispatch(reduceEnergy(activePlayerId, upgradeCost))
        validMove = true
      } else {
        console.warn('not enough ⚡')
      }

    }

    if(validMove) {
      this.setState({rowProps})
    }


  }

  render() {

    const { gameStarted, players, wholeTurn, activePlayer } = this.props
    const { createTileRow, handleEndTurnClick } = this
    const { rowProps } = this.state


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
          {createTileRow(rowProps.a)}
          {createTileRow(rowProps.b)}
          {createTileRow(rowProps.c)}
          {createTileRow(rowProps.d)}
        </div>
        <div className="sun"></div>
        </div>
        
      </div>
    );
  }
}


const mapStateToProps = function ({ general, players, game }) {
  return {
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
