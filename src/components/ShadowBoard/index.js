import React from 'react';
import { connect } from 'react-redux'
import styles from './ShadowBoard.module.scss'

const shadowLevels = [styles.shadowLevel1, styles.shadowLevel2, styles.shadowLevel3]

const ShadowBoard = ({ board }) => (
  <div className={styles.shadowBoard}>
    {
      board[0] && board.map(row => row.map(tile => <Tile>{tile.level > 0 && <Shadow level={tile.level} />}</Tile>))
    }
  </div>
)

const Shadow = ({ level }) => (
  <div className={[styles.shadow, shadowLevels[level - 1]].join(' ')}></div>
)

const Tile = ({ children }) => (
  <div className={styles.shadowTile}>
    {children}
  </div>
)

const mapStateToProps = ({ board }) => ({
  board
})

export default connect(mapStateToProps)(ShadowBoard);