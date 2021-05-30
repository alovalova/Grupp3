import { useEffect, useState, useRef } from 'react'
import token from './../img/token.png';
import { sleep } from './../modules/card';

export const Token = ({ winner }) => {

    const [tokens, setTokens] = useState(localStorage.getItem('Tokens'))
    const [potTokens, setPot] = useState(localStorage.getItem('Pot'))
    const Tokenref = useRef();
    const Potref = useRef();

    if (!localStorage.getItem('Tokens'))
        localStorage.setItem('Tokens', 10)
    else if (!localStorage.getItem('Pot'))
        localStorage.setItem('Pot', 0)

    useEffect(() => {
        Tokenref.current.innerText = tokens;
        localStorage.setItem('Tokens', tokens)
        Potref.current.innerText = potTokens;
        localStorage.setItem('Pot', potTokens)
    }, [tokens, potTokens])

    const addToken = () => {
        if (tokens > 0){
            setTokens(tokens - 1)
            setPot(+potTokens +1)
        }
    }

    useEffect(() => {
        var income = parseInt(localStorage.getItem('Pot'))

        if (winner === 'Player'){
            localStorage.setItem('Pot', 0)
            var old_income = parseInt(localStorage.getItem('Tokens'))
            var new_income = income * 2
            var total_income = new_income + old_income
            localStorage.setItem('Tokens', total_income)
            Tokenref.current.innerText = total_income;
            setTokens(total_income)
            
        } else if (winner === 'Dealer'){
            Potref.current.innerText = 0;
            
        } else if (winner === 'Draw'){
            var old_income = parseInt(localStorage.getItem('Tokens'))
            var draw_income = old_income + income
            localStorage.setItem('Tokens', draw_income);
            Tokenref.current.innerText = draw_income;
            setTokens(draw_income)
        }
        localStorage.setItem('Pot', 0)
        setPot(0)
        if (localStorage.getItem('Tokens') <= 0 && localStorage.getItem('Pot') <= 0){
            const tokensReset = async () => {
                await sleep(1500)
                alert("You are out of tokens. Walk the plank. \n \n \nJust kidding, here, we give you 10 more.");
                localStorage.setItem('Tokens', 10)
                Tokenref.current.innerText = 10;
            } 
            tokensReset()
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
