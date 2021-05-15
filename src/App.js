import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [deck, setDeck] = useState()
  const [cards, setCards] = useState([])
  const getDeck = async () => {
    await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then((res) =>
      setDeck(res.data)
    )
  }

  const drawCard = async () => {
    await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`).then((res) => {
      setCards((cards) => [...cards, res.data.cards[0]])
      document.querySelector('#currCard').src = res.data.cards[0].image
    })
  }

  console.log(cards)
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => getDeck()}>Click me to start</button>
        <button onClick={() => drawCard()}>Click me to draw card</button>
        <img src="#" id="currCard"></img>
      </header>
    </div>
  );
}

export default App;
