import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import { startGame } from './actions/general'
import Tile from './components/tile'

import './App.css';

class App extends Component {

  state = {
    rowProps: {
      a: {
        name: 'a',
        props: [{level: 0}, {level: 0}, {level: 0}]
      }, 
      b: {
        name: 'b',
        props: [{level: 0}, {level: 0}, {level: 0}]
      }, 
      c: {
        name: 'c',
        props: [{level: 0}, {level: 0}, {level: 0}]
      }, 
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(startGame())

    console.log(this.state.rowProps)
  }

  fakeClick = () => {
    alert('click!')
  }

  createTileRow = (data) => {
    const row = Array(3)
    data.props.forEach((props, i) => {
      row[i] = <Tile {...props} key={data.name + (i+1)} col={i+1} row={data.name} 
      handleClick={() => this.handleRowClick({col: (i+1), row: data.name})} />
    })

    return row
  }

  handleRowClick = ({col, row}) => {
    const { rowProps } = this.state

    rowProps[row].props[col - 1].level++ 

    this.setState({rowProps})
  }

  render() {

    const { gameStarted } = this.props
    const { createTileRow } = this
    const { rowProps } = this.state


    return (
      <div className="App">


        {gameStarted && <h1>Game started</h1>}
        <div className="board">
          {createTileRow(rowProps.a)}
          {createTileRow(rowProps.b)}
          {createTileRow(rowProps.c)}
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
