import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import { startGame } from './actions/general'
import Tile from './components/tile'

import './App.css';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(startGame())
  }

  fakeClick = () => {
    alert('click!')
  }

  render() {

    const { gameStarted } = this.props

    return (
      <div className="App">


        {gameStarted && <h1>Game started</h1>}
        <div className="board">
          <Tile state="lvl1" />
          <Tile state="seed" />
          <Tile state="lvl2" handleClick={this.fakeClick} />
          <Tile state="seed" />
          <Tile state="seed" />
          <Tile state="seed" />
          <Tile state="seed" />
          <Tile state="seed" />
          <Tile />
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
