import { useEffect, useState, useRef } from 'react'
import token from './../img/token.png';
import { sleep } from './../modules/card';

export const Token = ({ winner }) => {
    //Sets tokens to 10 at the beginning and pot to 0.
    if (!localStorage.getItem('Tokens'))
        localStorage.setItem('Tokens', 10)
    else if (!localStorage.getItem('Pot'))
        localStorage.setItem('Pot', 0)

    const [tokens, setTokens] = useState(localStorage.getItem('Tokens'))
    const [potTokens, setPot] = useState(localStorage.getItem('Pot'))
    const Tokenref = useRef();
    const Potref = useRef();

    //When the page loads, add value to Tokens and Pot. Everytime Tokens and Pot update, 
    //The value will update, thanks to the useEffect.
    useEffect(() => {
        Tokenref.current.innerText = tokens;
        localStorage.setItem('Tokens', tokens)
        Potref.current.innerText = potTokens;
        localStorage.setItem('Pot', potTokens)
    }, [tokens, potTokens])

    //setTokens removes one token from the player,
    //setPot adds one token to the pot.
    const addToken = () => {
        if (tokens > 0) {
            setTokens(tokens - 1)
            setPot(+potTokens + 1)
        }
    }
    //This useEffect is for setting the right amount of tokens in Tokens and Pot, without
    //having to reload the page.
    useEffect(() => {
        //Fetching Pot from LocalStorage, parsing it into an integer,
        //and placing it in a variable
        var income = parseInt(localStorage.getItem('Pot'))

        //If the player wins, they get the pot times two.
        if (winner === 'You') {
            var old_income = parseInt(localStorage.getItem('Tokens'))
            var new_income = income * 2
            var total_income = new_income + old_income
            localStorage.setItem('Tokens', total_income)
            Tokenref.current.innerText = total_income;
            setTokens(total_income)
            localStorage.setItem('Pot', 0)
            setPot(0)
            //If the dealer wins, the pot "disappears"
        } else if (winner === 'Dealer') {
            Potref.current.innerText = 0;
            localStorage.setItem('Pot', 0)
            setPot(0)

            //If it is a draw, the amount in the pot goes back to the player.
        } else if (winner === 'Draw') {
            var old_income = parseInt(localStorage.getItem('Tokens'))
            var draw_income = old_income + income
            localStorage.setItem('Tokens', draw_income);
            Tokenref.current.innerText = draw_income;
            setTokens(draw_income)
            localStorage.setItem('Pot', 0)
            setPot(0)
        }

        //If tokens and pot is empty, give the player an alert and refill tokens with 10.
        if (localStorage.getItem('Tokens') <= 0 && localStorage.getItem('Pot') <= 0 && winner) {
            const tokensReset = async () => {
                //A sleep for the alert, so that the modal after the game is readable
                await sleep(3500)
                alert("Arrr! You are out of tokens. Walk the plank, pirate. \n \n \nJust kidding, here, we give you 10 more.");
                localStorage.setItem('Tokens', 10)
                setTokens(10)
                Tokenref.current.innerText = 10;
            }
            tokensReset()
        }
    }, [winner])

    return (
        <div className="token">
            <div className="tokenClass">
                <p>The Pot: </p><h1 ref={Potref}></h1>
                <p>Your tokens: </p><h1 ref={Tokenref}></h1>
                <img src={token} id="token" alt="token" />
            </div>
            <div className="buttonGroup" id="btnParent">
                <button id="tokenBtn" className="btn btn-lg" onClick={() => addToken()}>Bet</button>
            </div>
        </div>
    )
}
