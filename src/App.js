import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import { startGame } from './actions/general'
import { increaseEnergy, reduceEnergy } from './actions/players'
import { updateTileLevel, updateTileOwner, updateTileLight } from './actions/board'
import { endTurn } from './actions/game'
import Tile from './components/tile'
import Planet from './components/Planet'
import { getBuildingPowerOutput, getPlayerId, getUpgradeCost, getShadowLenght } from './gameHelpers'

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

  reduceEnergyOfActivePlayer = reduceBy => this.props.dispatch(reduceEnergy(this.props.activePlayerId, reduceBy))

  handleRowClick = ({col, row, owner}) => {

    const { board, players, dispatch, turn, activePlayerId, activePlayer, sunDirection } = this.props

    const updateClickedTileLevel = level => dispatch(updateTileLevel(row, col, level)) 
    const updateClickedTileOwner = owner => dispatch(updateTileOwner(row, col, owner))

    if(owner && activePlayer.name !== owner) {
      console.warn('invalid move! 💀')
      return
    }

    if(turn < 1) {
      updateClickedTileLevel(1)
      updateClickedTileOwner(activePlayer.name)
      this.castShadow(col, row, sunDirection, 1)
      this.handleEndTurnClick()
      return
    }

    const currentLevel = board[row].props[col - 1].level

    if(currentLevel < 3) {

      const currentLevel = board[row].props[col - 1].level

      const currentEnergy = activePlayer.energy

      const upgradeCost = getUpgradeCost(currentLevel)
      console.log({upgradeCost})

      if(currentEnergy >= upgradeCost) {
        let newLevel = currentLevel + 1

        updateClickedTileLevel(newLevel)
        updateClickedTileOwner(activePlayer.name)
        this.reduceEnergyOfActivePlayer(upgradeCost)

        // set shadow 

        this.castShadow(col, row, sunDirection, newLevel)

      } else {
        console.warn('not enough ⚡')
      }

    }
  }

  castShadow = (col, row, sunDirection, buildingLevel) => {
    const shadowLength = getShadowLenght(buildingLevel)


    if(sunDirection === 'right') {

      let remainingShadowLength = shadowLength
      const castLeftShadow = (row, col, remainingShadowLength) => {
        col > 1 && this.props.dispatch(updateTileLight(row, col - 1, false))

        remainingShadowLength--

        if(remainingShadowLength > 0 && col > 1) {
          castLeftShadow(row, col - 1, remainingShadowLength)
        }
      }

      castLeftShadow(row, col, remainingShadowLength)
      
    }
  }

  doNewSeasonActions = () => {

    const { board, players, dispatch } = this.props
    
    console.log(`🏁 turn ${this.props.wholeTurn}!`)
    
    let gainedEnergies = {
      blue: 0,
      red: 0
    }

    for (const i in board) {
      console.log('👋', board[i])
      board[i].props.forEach(tile => {
        if(tile.owner && tile.isBright) {
          console.log({tile})
          gainedEnergies[tile.owner]+= getBuildingPowerOutput(tile.level)
        }
      })
    }

    for (let playerName in gainedEnergies) {
      dispatch(increaseEnergy(getPlayerId(playerName), gainedEnergies[playerName]))  
    }

    console.log({gainedEnergies})
  }


  componentDidUpdate(prevProps) {
    if(prevProps.wholeTurn !== this.props.wholeTurn) {
      this.doNewSeasonActions()
    }
  }

  renderBoard = () => {
    const { board } = this.props

    let boardArr = []

    for(var row in board) {
      boardArr.push(this.createTileRow(board[row]))
    }

    return boardArr
  }

  

  render() {

    const { gameStarted, players, wholeTurn, activePlayer, sunDirection } = this.props
    const { createTileRow, handleEndTurnClick, renderBoard } = this

    return (
      <div className="App">
        <header>

        {wholeTurn > 0 ? <p>Season {wholeTurn} </p> : <p>Initial state</p>}        
        {gameStarted && <h1>Turn of {activePlayer.name} player</h1>}
        <p>⚡ {activePlayer.energy}</p>

        {wholeTurn > 0 && <button onClick={handleEndTurnClick}>End turn</button>}
        </header>
        <div className="board-holder">
          <Planet sunDirection={sunDirection}>
            {renderBoard()}
          </Planet>
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
    wholeTurn: game.wholeTurn,
    sunDirection: game.sunDirection
  }
}

export default connect(mapStateToProps)(App);
