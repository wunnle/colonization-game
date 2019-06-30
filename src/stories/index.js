import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo';
import Tile from '../components/Tile'
import Planet from '../components/Planet';
import Provider from '../Provider'
import store from '../store'
import '../App.css';
import { withKnobs, number, optionsKnob } from '@storybook/addon-knobs';



const withProvider = (story) => (
  <Provider store={store}>
    {story()}
  </Provider>
)

storiesOf('Tile', module)
  .add('default', () => (
    <Tile>Hey</Tile>
  ))


const ownerOpts = {
  None: '',
  Red: 'red',
  Blue: 'blue'
}

const lightOpts = {
  right: 'right',
  left: 'left',
  up: 'up',
  down: 'down'
}

const optionsObj = {
  display: 'inline-radio'
};

storiesOf('Planet', module)
  .addDecorator(withProvider)
  .addDecorator(withKnobs)
  .add('default', () => (
    <>
      <div class="App">
        <div className="board-holder">
          <Planet
            sunDirection={optionsKnob('sunDirection', lightOpts, 'right', optionsObj)}
            lightedUp={true}
            bricksFallen={true}
          >
          {Array(number('count', 4)).fill(<Tile lightedUp={true} level={number('level', 0)} owner={optionsKnob('owner', ownerOpts, '', optionsObj)} shadowLevel={0} />)}
          </Planet>
        </div>
      </div>
    </>
  ))

