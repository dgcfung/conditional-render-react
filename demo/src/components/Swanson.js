import React, { Component } from 'react';
import axios from 'axios';

const URL = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';

export default class Swanson extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: ''
    };
  }

  async fetchQuote() {
    const resp = await axios(URL)
    this.setState({ quote: resp.data[0] })
  }

  componentDidMount() {
    setInterval(this.fetchQuote.bind(this), 5000);
  }

  getQuoteDescription() {
    const quote = this.state.quote;
    if (quote.length === 0) {
      return <div>There is no quote yet</div>
    } else if (quote.slice(0, 2) === "I ") {
      return <div>Ron is probably talking about himself</div>

    } else if (quote.length < 50) {
      return <div>What a wonder.  Ron uttered a short quote</div>
    } else {
      return <div>Unsurprisingly, Ron rambled for a long time</div>
    }
  }
  render() {
    const quote = this.state.quote;
    return (
      <div class="item">
        <h2>If / Else</h2>
        <h4>{quote}</h4>
        {this.getQuoteDescription()}
      </div>
    );
  }
}
