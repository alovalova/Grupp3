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
        localStorage.setItem('Tokens', tokens)
    }, [tokens])

    useEffect(() => {
        Potref.current.innerText = localStorage.getItem('Pot');
        localStorage.setItem('Pot', potTokens)
    }, [potTokens])

    const addToken = () => {
        setTokens(tokens - 1)
        setPot(+potTokens +1)
        
    }

    return (
        <div className="token">
            <div className="tokenClass">
                <h1 ref={Tokenref}></h1>
                <h1 ref={Potref}></h1>
                <img src={token} id="token"/>
            </div>
            <div className="buttonGroup">
                <button id="tokenBtn" className="btn btn-lg" onClick={() => addToken()}>Bet</button>
            </div>
        </div>
    )
}
