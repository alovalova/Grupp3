import axios from 'axios'

export const ButtonGroup = ({ deck, setDeck, drawPlayerCard, setDealerTurn, setPlayerTurn }) => {
    const getDeck = async () => {
        await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then((res) =>
            setDeck(res.data)
        )
    }
    return (
        <div>
            <div className="buttonGroup">
                {deck === undefined ? (<button className="btn btn-lg" id="startBtn" onClick={() => getDeck()}>Start</button>) : (<><button className="btn btn-lg" id="drawBtn" onClick={() => drawPlayerCard()}>Draw card</button>
                    <button className="btn btn-lg" id="stopBtn" onClick={() => { setDealerTurn(true); setPlayerTurn(false) }}>Stop</button></>)}
            </div>
        </div>
    )
}
