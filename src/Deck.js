import React, { Component } from 'react'
import axios from 'axios'



class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null };
  }

  async componentDidMount() {
    const apiUrl = "https://deckofcardsapi.com/api/deck/new/shuffle/";
    let deck = await axios.get(apiUrl);
    let data = deck.data;
    console.log(data);
    this.setState({deck: deck.data});
  }
  
  render() {
    return (
      <div>
        <h1>Card Dealer</h1>
      </div>
    )
  }
}

export default Deck;