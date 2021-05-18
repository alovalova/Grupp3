import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [deck, setDeck] = useState()
  const [playerCards, setPlayerCards] = useState([])
  const [dealerCards, setDealerCards] = useState([])
  const [dealerTurn, setDealerTurn] = useState(false)
  const getDeck = async () => {
    await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then((res) =>
      setDeck(res.data)
    )
  }

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const drawPlayerCard = async () => {
    await drawCard().then((res) => {
      setPlayerCards((playerCards) => [...playerCards, res.data.cards[0]])
      var img = document.createElement("img");
      img.src = res.data.cards[0].image
      document.querySelector('#playerHand').appendChild(img);
    })
    if (document.querySelector('#playerHand').childElementCount == 1) {
      await sleep(500)
      drawPlayerCard()
    }
  }
  const drawCard = async () => {
    return await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)

  }
  const drawDealerCard = async () => {
    await drawCard().then(res => {
      setDealerCards((dealerCards) => [...dealerCards, res.data.cards[0]])
      var img = document.createElement("img");
      img.src = res.data.cards[0].image
      document.querySelector('#dealerHand').appendChild(img);
      if (dealerTurn) {
        let total = parseInt(getRealValue(res.data.cards[0].value))
        if (getTotal(total) <= 16) drawDealerCard()
      }
    })
  }

  const getTotal = (total) => {
    for (let i = 0; i < dealerCards.length; i++) {
      total += parseInt(getRealValue(dealerCards[i].value))
    }
    return total
  }

  useEffect(() => {
    if (playerCards.length === 2 || dealerTurn) {

      drawDealerCard()
    }
  }, [playerCards, dealerTurn])

  const getRealValue = (value) => {
    switch (value) {
      case 'JACK': return 11
      case 'QUEEN': return 12
      case 'KING': return 13
      case 'ACE': return 14
      default: return value
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div id="dealerHand"></div>
        <button onClick={() => getDeck()}>Start</button>
        <button onClick={() => drawPlayerCard()}>Draw card</button>
        <button onClick={() => setDealerTurn(true)}>Stop</button>
        <div id="playerHand"></div>
      </header>
    </div>
  );
}

export default App;
