import { useEffect, useState, useRef } from 'react'
import token from './../img/token.png';

export const Token = ({ winner }) => {
    if (!localStorage.getItem('Tokens'))
        localStorage.setItem('Tokens', 10)
    else if (!localStorage.getItem('Pot'))
        localStorage.setItem('Pot', 0)
    else if (localStorage.getItem('Tokens') <= 0 && localStorage.getItem('Pot') <= 0)
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

    useEffect(() => {
        var income = parseInt(localStorage.getItem('Pot'))

        if (winner === 'Player'){
            localStorage.setItem('Pot', 0)
            var old_income = parseInt(localStorage.getItem('Tokens'))
            var new_income = income * 2
            var total_income = new_income + old_income
            localStorage.setItem('Tokens', total_income)
            
        } else if (winner === 'Dealer'){
            localStorage.setItem('Pot', 0)
            
        } else if (winner === 'Draw'){
            var draw_income = old_income + income
            localStorage.setItem('Tokens', draw_income);
        }
    }, [winner])

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
