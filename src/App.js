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

  render() {

    const { gameStarted } = this.props

    return (
      <div className="App">
        {gameStarted && <h1>Game started</h1>}
        <Tile state="lvl1" />
        <Tile state="seed" />
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
