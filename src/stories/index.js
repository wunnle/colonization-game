import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo';
import Tile from '../components/Tile'
import Planet from '../components/Planet';
import Provider from '../Provider'
import store from '../store'
import '../App.css';
import { Controls } from '../components/Controls';
import { withKnobs, text, boolean, number, optionsKnob } from '@storybook/addon-knobs';



const withProvider = (story) => (
  <Provider store={store}>
    {story()}
  </Provider>
)

const stories = storiesOf('Storybook Knobs', module);

stories.addDecorator(withKnobs);

// Knobs for React props
stories.add('with a button', () => (
  <button disabled={boolean('Disabled', false)} >
    {text('Label', 'Hello Storybook')}
  </button>
));

// Knobs as dynamic variables.
stories.add('as dynamic variables', () => {
  const name = text('Name', 'Arunoda Susiripala');
  const age = number('Age', 89);

  const content = `I am ${name} and I'm ${age} years old.`;
  return (<div>{content}</div>);
});


storiesOf('Button', module)
  .add('with text', () => (
    <Button>Hello Button</Button>
  ))
  .add('with emoji', () => (
    <Button><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
  ))


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
      <Controls />
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

