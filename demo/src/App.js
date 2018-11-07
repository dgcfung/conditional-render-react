import React, { Component } from 'react';
import './App.css';
import SimpleNav from './components/SimpleNav';
import BooleanShort from './components/BooleanShort';
import RandomUser from './components/RandomUser';
import Swanson from './components/Swanson';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Conditional Rendering Demo</h1>
        <RandomUser />
        <BooleanShort />
        <Swanson />
        <SimpleNav />
      </div>
    );
  }
}

export default App;
