import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import { startGame } from './actions/general'
import Tile from './components/tile'

import './App.css';

const defaultRowProp = {
  level: 0,
  owner: ''
}

class App extends Component {
  state = {
    activePlayer: 'blue',
    players: [
      {
        name: 'blue',
        energy: 3
      },
      {
        name: 'red',
        energy: 3
      }
    ],
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

    let { activePlayer } = this.state

    activePlayer = activePlayer === 'blue' ? 'red' : 'blue'
    this.setState({activePlayer})
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
        return 3
    }
  }

  handleRowClick = ({col, row, owner}) => {

    let { rowProps, activePlayer, players } = this.state

    const currentLevel = rowProps[row].props[col - 1].level
    let validMove = false

    if(owner && activePlayer !== owner) {
      console.warn('invalid move!')
      return
    }

    if(currentLevel < 3) {

      const currentLevel = rowProps[row].props[col - 1].level
      const currentEnergy = players.find(player => player.name === activePlayer).energy
      const upgradeCost = this.getUpgradeCost(currentLevel)

      if(currentEnergy >= upgradeCost) {
        rowProps[row].props[col - 1].level++
        rowProps[row].props[col - 1].owner = activePlayer
        players.find(player => player.name === activePlayer).energy -= upgradeCost
      } else {
        console.warn('not enough ⚡')
      }



      validMove = true
    }

    if(validMove) {
      activePlayer = activePlayer === 'blue' ? 'red' : 'blue'
      this.setState({rowProps, players})
    }


  }

  render() {

    const { gameStarted } = this.props
    const { createTileRow, handleEndTurnClick } = this
    const { rowProps, activePlayer: turnOf, players } = this.state


    return (
      <div className="App">
        <header>
        {gameStarted && <h1>Turn of {turnOf} player</h1>}
        <p>⚡ {players.find(player => player.name === turnOf).energy}</p>
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


const mapStateToProps = function ({ general }) {
  return {
    gameStarted: general.gameStarted
  }
}

export default connect(mapStateToProps)(App);
