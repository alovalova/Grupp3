import axios from 'axios'

export const ButtonGroup = ({ deck, setDeck, drawPlayerCard, setDealerTurn, setPlayerTurn, playerTurn }) => {
    //Calling API and then setting deck
    const getDeck = async () => {
        await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then((res) =>
            setDeck(res.data)
        )
    }
    //If the deck of cards in undefined, show Startbutton, else show Draw Card-button and Stop-button and then awaiting dealers cards
    return (
        <div>
            <div className="buttonGroup">
                {deck === undefined ? (<button className="btn btn-lg" id="startBtn" onClick={() => getDeck()}>Start</button>) : (
                    <>
                        {playerTurn ? (
                            <>  <button className="btn btn-lg" id="drawBtn" onClick={() => drawPlayerCard()}>Draw card</button>
                                <button className="btn btn-lg" id="stopBtn" onClick={() => { setDealerTurn(true); setPlayerTurn(false) }}>Stop</button></>) :
                            (<button className="btn btn-lg" id="awaitBtn" disabled="true">Awaiting dealer</button>)
                        }
                    </>
                )}
            </div>
        </div>
    )
}
