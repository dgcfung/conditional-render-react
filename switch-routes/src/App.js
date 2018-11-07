import React, { Component } from 'react';
import Welcome from './components/Welcome';
import Timer from './components/Timer';
import Party from './components/Party';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentView: 'welcome'
    }
  }

  getView() {
    const view = this.state.currentView;
    switch (view) {
      case 'timer':
        return <Timer />
      case 'party':
        return <Party />
      default:
        return <Welcome />
    }
  }

  setView(view) {
    this.setState({
      currentView: view
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Switch Demo</h1>
        <div>
          <button onClick={() => this.setView('timer')}>
            Timer
          </button>
          <button onClick={() => this.setView('party')}>
            Party
          </button>
          {this.getView()}
        </div>
      </div>
    );
  }
}

export default App;
