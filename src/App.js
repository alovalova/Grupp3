import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Token } from './components/Token'
import { sleep, getWinner, getTotal } from './modules/card'
import { ButtonGroup } from './components/ButtonGroup.js'
import { WinnerModal } from './components/WinnerModal';
import header from './img/header.png';


function App() {
  const [deck, setDeck] = useState()
  const [playerCards, setPlayerCards] = useState([])
  const [dealerCards, setDealerCards] = useState([])
  const [dealerTurn, setDealerTurn] = useState(false)
  const [winner, setWinner] = useState('')

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
  const showWinner = (setPlayerCards, setDealerCards, dealerCards, playerCards, setDeck) => {
    let winner = getWinner(dealerCards, playerCards)
    console.log(winner)
    setWinner(winner)
    document.querySelector('#dealerHand').innerHTML = '';
    document.querySelector('#playerHand').innerHTML = '';
    setPlayerCards([])
    setDealerCards([])
    setDeck()
  }
  useEffect(() => {
    if (playerCards.length === 2 || dealerTurn) {
      drawDealerCard(setDealerCards)
    }
  }, [playerCards, dealerTurn])

  useEffect(() => {
    const showCards = async () => {
      let img = document.createElement("img");
      img.src = playerCards[playerCards.length - 1].image
      img.className = 'card-API-img'
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
      img.className = 'card-API-img'
      document.querySelector('#dealerHand').appendChild(img);
      await sleep(1000)
      if (dealerTurn) {
        let total = 0
        if (getTotal(total, dealerCards) <= 16) drawDealerCard()
        else {
          setDealerTurn(false)
          showWinner(setPlayerCards, setDealerCards, dealerCards, playerCards, setDeck)
        }
      }
    }
    if (dealerCards.length > 0 && playerCards.length !== 0) {
      showCards()
    }
  }, [dealerCards])

  return (
    <div className="container">
      <div className="hands">
        <img src={header} id='backside' />
        <h3>Dealer Hand</h3>
        <div id="dealerHand"></div>
        <h3>Player Hand</h3>
        <div id="playerHand"></div>
        <ButtonGroup deck={deck} setDeck={setDeck} drawPlayerCard={drawPlayerCard} setDealerTurn={setDealerTurn} />
        <Token />
        <WinnerModal winner={winner} />
      </div>
    </div>
  );
}

export default App;
