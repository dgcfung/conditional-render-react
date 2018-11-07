import React, { Component } from 'react';
import Contact from './Contact';

export default class SimpleNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentView: ''
    };
  }

  setView(view) {
    this.setState({
      currentView: view
    });
  }

  getView() {
    const view = this.state.currentView;
    switch(view) {
      case 'home':
        return <div>This is Home</div>;
      case 'about':
        return <div>Some Stuff About this Demo</div>
      case 'contact':
        return <Contact />
      default: 
        return <div>Welcome to the Switch Demo</div>
    }
  }

  render() {
    return (
      <div className="item">
        <h2>Switch View</h2>
        <div>
          <button onClick={() => this.setView('about')}>
            About
          </button>
          <button onClick={() => this.setView('home')}>
            Home
          </button>
          <button onClick={() => this.setView('contact')}>
            Contact
          </button>
        </div>
        {this.getView()}
      </div>
    );
  }
}

