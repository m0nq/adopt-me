import React from 'react';
import { createRoot } from 'react-dom';

const Pet = ({ name, animal, breed }) => {
  return React.createElement(
    'div',
    {},
    [
      React.createElement('h1', {}, name),
      React.createElement('h1', {}, animal),
      React.createElement('h1', {}, breed)
    ]
  );
};

const App = () => {
  return React.createElement(
    'div',
    {},
    [
      React.createElement('h1', {}, 'Adopt Me'),
      React.createElement(Pet, {
        animal: 'Dog',
        name: 'Luna',
        breed: 'Javanese'
      }),
      React.createElement(Pet, {
        animal: 'Bird',
        name: 'Pepper',
        breed: 'Cockatiel'
      }),
      React.createElement(Pet, {
        animal: 'Cat',
        name: 'Doink',
        breed: 'Mixed'
      })
    ]
  );
};

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(React.createElement(App));
