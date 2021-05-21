export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const showWinner = (setPlayerCards, setDealerCards, dealerCards, playerCards, setDeck) => {
    let winner = getWinner(dealerCards, playerCards)
    console.log(winner)
    alert('The winner is: ' + winner)
    document.querySelector('#dealerHand').innerHTML = '';
    document.querySelector('#playerHand').innerHTML = '';
    setPlayerCards([])
    setDealerCards([])
    setDeck()
}

export const getWinner = (dealerCards, playerCards) => {
    let dealerTotal = 0
    let playerTotal = 0
    let winner
    for (let i = 0; i < dealerCards.length; i++) {
        dealerTotal += +getRealValue(dealerCards[i].value)
    }
    for (let i = 0; i < playerCards.length; i++) {
        playerTotal += +getRealValue(playerCards[i].value)
    }
    if ((playerTotal > 21 && dealerTotal > 21) || playerTotal === dealerTotal) winner = 'Draw'
    else if ((playerTotal < 21 && (playerTotal > dealerTotal)) || dealerTotal > 21) winner = 'Player'
    else winner = 'Dealer'

    console.log('dealer ', dealerTotal, 'player ', playerTotal);
    return winner
}

export const getTotal = (total, dealerCards) => {
    for (let i = 0; i < dealerCards.length; i++) {
        total += parseInt(getRealValue(dealerCards[i].value))
    }
    return total
}

export const getRealValue = (value) => {
    switch (value) {
        case 'JACK': return 10
        case 'QUEEN': return 10
        case 'KING': return 10
        case 'ACE': return 11
        default: return value
    }
}