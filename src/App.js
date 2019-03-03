import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import { startGame } from './actions/general'

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {gameStarted && <h1>Game started</h1>}
        </header>
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
