import React, { Component } from 'react'
import axios from 'axios'
const API_URL_BASE = "https://deckofcardsapi.com/api/deck/";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawn: [] };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    let deck = await axios.get(`${API_URL_BASE}/new/shuffle/`);
    this.setState({ deck: deck.data });
  }

  async getCard() {
    let deck_id = this.state.deck.deck_id;
    try {
      let cardUrl = `${API_URL_BASE}/${deck_id}/draw/`;
      let cardResponse = await axios.get(cardUrl);
      if(!cardResponse.data.success) {
        throw new Error("No cards remaining")
      }
      let card = cardResponse.data.cards[0];
      console.log(cardResponse.data);
      this.setState(state => ({
        drawn: [
          ...state.drawn, 
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`
          }
        ]
      }));
    } catch (err) {
      alert(err);
    }
  }
  
  render() {
    return (
      <div>
        <h1>Card Dealer</h1>
        <button onClick={this.getCard}>Get Card!</button>
      </div>
    )
  }
}

export default Deck;