import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import { startGame } from './actions/general'
import { increaseEnergy, reduceEnergy } from './actions/players'
import { updateTileLevel, updateTileOwner, updateTileLight, resetShadows } from './actions/board'
import { endTurn, popNotification, rotateSun } from './actions/game'
import Tile from './components/Tile'
import Planet from './components/Planet'
import Notification from './components/Notification'
import { getBuildingPowerOutput, getPlayerId, getUpgradeCost, getShadowLenght, getNextSunDirection, getShadowIntensity } from './gameHelpers'
import './App.css';

const defaultRowProp = {
  level: null,
  owner: ''
}

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(startGame())

    setTimeout(() => {
      this.setState({
        zPositions: Array(36).fill(0),
        bricksFallen: true
      })
    }, 600);

    setTimeout(() => {
      this.setState({
        lightedUp: true
      })

      document.querySelector('body').classList.add('lightedUp')
    }, 2400);
  }

  state = {
    //zPositions: Array(36).fill().map(i => Math.floor(Math.random() * 140) + 30)
    zPositions: Array(36).fill().map((item, i) => ((i * 30) - 100)).reverse()
  }

  newNotification = (message) => this.props.dispatch(popNotification(message))

  createTileRow = (data, rowIndex) => {
    console.log({ rowIndex })
    const row = Array(3)
    data.forEach((props, i) => {
      row[i] = <Tile {...props} lightedUp={this.state.lightedUp} zPosition={this.state.zPositions[i + rowIndex]} key={`row${rowIndex}` + (i + 1)} col={i + 1} row={data.name}
        handleClick={() => this.handleRowClick({ col: (i + 1), row: Number(rowIndex + 1), owner: props.owner })} />
    })

    return row
  }

  handleEndTurnClick = () => {
    this.props.dispatch(endTurn())
  }

  reduceEnergyOfActivePlayer = reduceBy => this.props.dispatch(reduceEnergy(this.props.activePlayerId, reduceBy))

  handleRowClick = ({ col, row, owner }) => {

    const { board, players, dispatch, turn, activePlayerId, activePlayer, sunDirection } = this.props

    const updateClickedTileLevel = level => dispatch(updateTileLevel(row, col, level))
    const updateClickedTileOwner = owner => dispatch(updateTileOwner(row, col, owner))

    if (owner && activePlayer.name !== owner) {
      console.warn('invalid move! 💀')
      return
    }

    if (turn < 1) {
      updateClickedTileLevel(1)
      updateClickedTileOwner(activePlayer.name)
      this.castShadow(col, row, sunDirection, 1)
      this.handleEndTurnClick()
      return
    }

    const currentLevel = board[row - 1][col - 1].level

    if (currentLevel < 3) {

      const currentLevel = board[row - 1][col - 1].level

      const currentEnergy = activePlayer.energy

      const upgradeCost = getUpgradeCost(currentLevel)

      if (currentEnergy >= upgradeCost) {
        let newLevel = currentLevel + 1

        updateClickedTileLevel(newLevel)
        updateClickedTileOwner(activePlayer.name)
        this.reduceEnergyOfActivePlayer(upgradeCost)

        // set shadow 
        console.log('casting shadow for level ' + newLevel)
        this.castShadow(col, row, sunDirection, newLevel)

      } else {
        console.warn('not enough ⚡')
      }

    }
  }

  castShadow = (col, row, sunDirection, buildingLevel) => {
    console.log(`will cast shadow on col: ${col}, row: ${row} `)
    const shadowLength = getShadowLenght(buildingLevel)
    const shadowIntensity = getShadowIntensity(buildingLevel)
    let remainingShadowLength = shadowLength

    const castShadow = (row, col, remainingShadowLength) => {

      if (sunDirection === 'right') {
        col > 1 && this.props.dispatch(updateTileLight(row, col - 1, shadowIntensity))

        remainingShadowLength--

        if (remainingShadowLength > 0 && col > 1) {
          castShadow(row, col - 1, remainingShadowLength)
        }
      }

      if (sunDirection === 'left') {
        col < 6 && this.props.dispatch(updateTileLight(row, col + 1, shadowIntensity))

        remainingShadowLength--

        if (remainingShadowLength > 0 && col < 6) {
          castShadow(row, col + 1, remainingShadowLength)
        }
      }

      if (sunDirection === 'down') {
        row > 1 && this.props.dispatch(updateTileLight(row - 1, col, shadowIntensity))

        remainingShadowLength--

        if (remainingShadowLength > 0 && row > 1) {
          castShadow(row - 1, col, remainingShadowLength)
        }
      }

      if (sunDirection === 'up') {
        row < 6 && this.props.dispatch(updateTileLight(row + 1, col, shadowIntensity))
        //updateTileLight(row + 1, col, shadowIntensity)

        remainingShadowLength--

        if (remainingShadowLength > 0 && row < 6) {
          castShadow(row + 1, col, remainingShadowLength)
        }
      }

    }

    castShadow(row, col, remainingShadowLength)
  }

  rotateSun = () => {
    const { sunDirection, dispatch } = this.props

    const currentAngle = Number(getComputedStyle(document.body).getPropertyValue('--shadowAngle').match(/\d/g).join(""))

    document.querySelector('body').style.setProperty('--shadowAngle', currentAngle + 90 + "deg");


    dispatch(rotateSun(getNextSunDirection(sunDirection)))
  }

  recalculateShadows = () => {
    const { board, sunDirection } = this.props

    const nextSunDirection = getNextSunDirection(sunDirection)

    board.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
        if (tile.level > 0) {
          this.castShadow(colIndex + 1, rowIndex + 1, nextSunDirection, tile.level)
        }
      })
    })

  }

  resetShadows = () => {
    this.props.dispatch(resetShadows())
  }

  doNewSeasonActions = () => {

    const { board, players, wholeTurn, dispatch } = this.props

    if (wholeTurn > 1) {
      console.log(`this is season ${wholeTurn}. rotating sun`)
      this.rotateSun()
      this.resetShadows()
      this.recalculateShadows()
    }

    console.log(`🏁 turn ${this.props.wholeTurn}!`)
    this.newNotification(`Season ${this.props.wholeTurn}!`)



    let gainedEnergies = {
      blue: 0,
      red: 0
    }

    board.forEach(row => {
      row.forEach(tile => {
        if (tile.owner && tile.level > tile.shadowLevel) {
          gainedEnergies[tile.owner] += getBuildingPowerOutput(tile.level)
        }
      })
    })

    for (let playerName in gainedEnergies) {
      dispatch(increaseEnergy(getPlayerId(playerName), gainedEnergies[playerName]))
    }

    console.table({ gainedEnergies })
  }


  componentDidUpdate(prevProps) {
    console.log(this.state.zPositions)

    if (prevProps.wholeTurn !== this.props.wholeTurn) {
      this.doNewSeasonActions()
    }
  }

  renderBoard = () => {
    const { board } = this.props

    let boardArr = []

    board.forEach((row, i) => boardArr.push(this.createTileRow(row, i)))

    return boardArr
  }



  render() {

    const { gameStarted, players, wholeTurn, activePlayer, sunDirection, notificationMessage } = this.props
    const { createTileRow, handleEndTurnClick, renderBoard } = this


    return (
        <div className="App">
          <div className="gradient"></div>
          <header>
            <div className='header__inner'>
              {wholeTurn > 0 ? <p>Season {wholeTurn} </p> : <p>Preparation stage</p>}
              {gameStarted && <h1>Turn of {activePlayer.name} player</h1>}
              <p>⚡ {activePlayer.energy}</p></div>
            <div className='button__holder'>{wholeTurn > 0 && <button onClick={handleEndTurnClick}>End turn</button>}</div>
          </header>

          <Notification>{notificationMessage}</Notification>
          <div className="board-holder">
            <Planet sunDirection={sunDirection} bricksFallen={this.state.bricksFallen} lightedUp={this.state.lightedUp}>
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
    sunDirection: game.sunDirection,
    notificationMessage: game.notificationMessage
  }
}

export default connect(mapStateToProps)(App);
