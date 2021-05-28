import { useEffect, useState, useRef } from 'react'
import token from './../img/token.png';

export const Token = () => {
    if (!localStorage.getItem('Tokens'))
        localStorage.setItem('Tokens', 10)
    else if (!localStorage.getItem('Pot'))
        localStorage.setItem('Pot', 0)
    else if (localStorage.getItem('Tokens') <= 0)
        alert("You are out of tokens.");

    const [tokens, setTokens] = useState(localStorage.getItem('Tokens'))
    const [potTokens, setPot] = useState(localStorage.getItem('Pot'))
    const Tokenref = useRef();
    const Potref = useRef();

    useEffect(() => {
        Tokenref.current.innerText = localStorage.getItem('Tokens');
        Potref.current.innerText = localStorage.getItem('Pot');
    }, [tokens, potTokens])

    const addToken = () => {
        setTokens(tokens - 1)
        localStorage.setItem('Tokens', tokens)

        setPot(+potTokens +1)
        localStorage.setItem('Pot', potTokens)
    }
    /*
    WinnerPot (() => {
        if (winner === 'Player')
            var income = localStorage.getItem('Pot')
            var new_income = income.value * 2
            console.log(new_income) 
    })
    */

    return (
        <div className="token">
            <div className="tokenClass">
                <p>The Pot: </p><h1 ref={Potref}></h1>
                <p>Your Coins: </p><h1 ref={Tokenref}></h1>
                <img src={token} id="token"/>
            </div>
            <div className="buttonGroup" id="btnParent">
                <button id="tokenBtn" className="btn btn-lg" onClick={() => addToken()}>Bet</button>
            </div>
        </div>
    )
}
