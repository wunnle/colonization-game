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
    turnOf: 'blue',
    rowProps: {
      a: {
        name: 'a',
        props: [{...defaultRowProp}, {...defaultRowProp}, {...defaultRowProp}]
      }, 
      b: {
        name: 'b',
        props: [{...defaultRowProp}, {...defaultRowProp}, {...defaultRowProp}]
      }, 
      c: {
        name: 'c',
        props: [{...defaultRowProp}, {...defaultRowProp}, {...defaultRowProp}]
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
      handleClick={() => this.handleRowClick({col: (i+1), row: data.name, owner: props.owner })} />
    })

    return row
  }

  handleRowClick = ({col, row, owner}) => {

    console.log({owner})

    let { rowProps, turnOf } = this.state

    const currentLevel = rowProps[row].props[col - 1].level
    let validMove = false

    if(owner && turnOf !== owner) {
      console.warn('invalid move!')
      return
    }

    if(currentLevel < 3) {
      rowProps[row].props[col - 1].level++
      rowProps[row].props[col - 1].owner = turnOf
      validMove = true
    }

    if(validMove) {
      turnOf = turnOf === 'blue' ? 'red' : 'blue'
      this.setState({rowProps, turnOf})
    }


  }

  render() {

    const { gameStarted } = this.props
    const { createTileRow } = this
    const { rowProps, turnOf } = this.state


    return (
      <div className="App">


        {gameStarted && <h1>Turn of {turnOf} player</h1>}
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
