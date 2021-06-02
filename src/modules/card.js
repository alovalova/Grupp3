// Module to keep App.js cleaner

// Sleep function to get the flow of the game more natural
export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Gets the total of dealer cards
export const getTotal = (total, dealerCards) => {
    for (let i = 0; i < dealerCards.length; i++) {
        total += parseInt(getRealValue(dealerCards[i].value))
    }
    return total
}

// Return the "real" value of the cards. Ace is always 11
export const getRealValue = (value) => {
    switch (value) {
        case 'JACK': return 10
        case 'QUEEN': return 10
        case 'KING': return 10
        case 'ACE': return 11
        default: return value
    }
}