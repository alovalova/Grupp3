import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Token } from './components/Token'
import { sleep, getTotal, getRealValue } from './modules/card'
import { ButtonGroup } from './components/ButtonGroup.js'
import { WinnerModal } from './components/WinnerModal';
import header from './img/header.png';

function App() {
  const [deck, setDeck] = useState()
  const [playerCards, setPlayerCards] = useState([])
  const [dealerCards, setDealerCards] = useState([])
  const [totalCards, setTotalCards] = useState("")
  const [dealerTurn, setDealerTurn] = useState(false)
  const [playerTurn, setPlayerTurn] = useState(true)
  const [winner, setWinner] = useState('')

  const getWinner = (dealerCards, playerCards) => {
    let dealerTotal = 0
    let playerTotal = 0
    let winner
    dealerCards.map(card => { dealerTotal += +getRealValue(card.value) })
    playerCards.map(card => { playerTotal += +getRealValue(card.value) })
    if ((playerTotal > 21 && dealerTotal > 21) || playerTotal === dealerTotal) winner = 'Draw'
    else if ((playerTotal <= 21 && (playerTotal > dealerTotal)) || dealerTotal > 21) winner = 'You'
    else winner = 'Dealer'
    setTotalCards({ playerTotal: playerTotal, dealerTotal: dealerTotal })
    return winner
  }

  const drawPlayerCard = async () => {
    await drawCard().then(async (res) => {
      if (res != undefined)
        setPlayerCards((playerCards) => [...playerCards, res.data.cards[0]])
    })
  }

  const drawCard = async () => {
    return await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
      .catch(error => {
        console.log(error)
        if (error.response.status === 500) {
          alert("Something went wrong. It's not your fault, its ours.")
          clear()
        }
      })
  }
  const drawDealerCard = async () => {
    await drawCard().then(res => {
      if (res != undefined)
        setDealerCards((dealerCards) => [...dealerCards, res.data.cards[0]])
    })
  }
  const showWinner = async (setPlayerCards, setDealerCards, dealerCards, playerCards, setDeck) => {
    let winner = getWinner(dealerCards, playerCards)
    await sleep(1000)
    setWinner(winner)
    clear()
  }

  const clear = () => {
    document.querySelector('#dealerHand').innerHTML = '';
    document.querySelector('#playerHand').innerHTML = '';
    setPlayerCards([])
    setDealerCards([])
    setPlayerTurn(true)
    setDealerTurn(false)
    setDeck()
  }
  useEffect(() => {
    if (playerCards.length === 2 && playerTurn || dealerTurn) {
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
      await sleep(2000)
      if (dealerTurn) {
        let total = 0
        if (getTotal(total, dealerCards) <= 16) {
          drawDealerCard()
        }
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
        <img src={header} id='backside' alt="header" />
        <Token winner={winner} />
        <h3>Dealer Hand</h3>
        <div id="dealerHand"></div>
        <h3>Player Hand</h3>
        <div id="playerHand"></div>
        <ButtonGroup deck={deck} setDeck={setDeck} drawPlayerCard={drawPlayerCard} setDealerTurn={setDealerTurn} setPlayerTurn={setPlayerTurn} playerTurn={playerTurn} />

        <WinnerModal winner={winner} setWinner={setWinner} totalCards={totalCards} />
      </div>
    </div>
  );
}

export default App;
