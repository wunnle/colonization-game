import React from 'react';
import { connect } from 'react-redux'
import styles from './ShadowBoard.module.scss'


const ShadowBoard = ({ board }) => (
  <div className={styles.shadowBoard}>
    {
      board[0] && board[0].map(tile => <Tile>{tile.level > 0 && <Shadow/>}</Tile>)
    }
  </div>
)

const Shadow = () => (
  <div className={styles.shadow}></div>
)

const Tile = ({ children }) => (
  <div className={styles.shadowTile}>
    {children}
  </div>
)

const mapStateToProps = function ({ general, players, game, board }) {
  return {
    board
  }
}

export default connect(mapStateToProps)(ShadowBoard);