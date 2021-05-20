import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Token } from './components/Token'


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
    await drawCard().then(async (res) => {
      setPlayerCards((playerCards) => [...playerCards, res.data.cards[0]])
    })
  }

  const drawCard = async () => {
    return await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)

  }
  const drawDealerCard = async () => {
    await drawCard().then(res => {
      setDealerCards((dealerCards) => [...dealerCards, res.data.cards[0]])
    })
  }

  const getWinner = () => {
    let dealerTotal = 0
    let playerTotal = 0
    let winner
    for (let i = 0; i < dealerCards.length; i++) {
      dealerTotal += +getRealValue(dealerCards[i].value)
    }
    for (let i = 0; i < playerCards.length; i++) {
      playerTotal += +getRealValue(playerCards[i].value)
    }
    if (playerTotal < 21 && playerTotal > dealerTotal) winner = 'Player'
    else if (dealerTotal < 21 && dealerTotal > playerTotal) winner = 'Dealer'
    else winner = 'Draw'

    console.log(dealerTotal, playerTotal);
    return winner
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

  useEffect(() => {
    const showCards = async () => {
      let img = document.createElement("img");
      img.src = playerCards[playerCards.length - 1].image
      document.querySelector('#playerHand').appendChild(img);
      if (document.querySelector('#playerHand').childElementCount === 1) {
        await sleep(500)
        drawPlayerCard()
      }
    }
    if (playerCards.length > 0) {
      showCards()
    }

  }, [playerCards])

  useEffect(() => {
    const showCards = async () => {
      let img = document.createElement("img");
      img.src = dealerCards[dealerCards.length - 1].image
      document.querySelector('#dealerHand').appendChild(img);
      await sleep(1000)
      if (dealerTurn) {
        let total = 0
        if (getTotal(total) <= 16) drawDealerCard()
        else {
          setDealerTurn(false)
          let winner = getWinner()
          console.log(winner)
          alert('The winner is: ' + winner)
          document.querySelector('#dealerHand').innerHTML = '';
          document.querySelector('#playerHand').innerHTML = '';
          setPlayerCards([])
          setDealerCards([])
        }
      }
    }
    if (dealerCards.length > 0 && playerCards.length !== 0) {
      showCards()
    }
  }, [dealerCards])

  const getRealValue = (value) => {
    switch (value) {
      case 'JACK': return 10
      case 'QUEEN': return 10
      case 'KING': return 10
      case 'ACE': return 11
      default: return value
    }
  }

  return (
    <div className="container">
      <header className="App-header">
        <h3>Dealer Hand</h3>
        <div id="dealerHand"></div>
        
        <h3>Player Hand</h3>
        <div id="playerHand"></div>
        

        <div className="buttonGroup">
          <button className="btn btn-info" onClick={() => getDeck()}>Start</button>
          <button className="btn btn-info" onClick={() => drawPlayerCard()}>Draw card</button>
          <button className="btn btn-info" onClick={() => setDealerTurn(true)}>Stop</button>
          <Token />
        </div>
      </header>
    </div>
  );
}

export default App;
