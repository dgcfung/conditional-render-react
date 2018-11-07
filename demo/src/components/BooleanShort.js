import React, { Component } from 'react';

export default class BooleanShort extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ctr: 0
    };
  }

  componentDidMount() {
    setInterval(() => this.setState(state => ({
      ctr: state.ctr + 1
    })), 1000);
  }

  evenMsg() {
    return <p>The counter is even</p>
  }

  render() {
    const ctr = this.state.ctr;
    return (
      <div className="item">
        <h2>Boolean Short Circuit</h2>
        <p>{this.state.ctr}</p>
        {ctr % 2 === 0 && this.evenMsg()}
      </div>
    )
  }
}
