

export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
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