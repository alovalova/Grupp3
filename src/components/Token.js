import { useEffect, useState, useRef } from 'react'

export const Token = () => {
    if (!localStorage.getItem('tokens'))
        localStorage.setItem('tokens', 10)
    else if (localStorage.getItem('tokens') <= 0)
        localStorage.setItem('tokens', 10)

    const [tokens, setTokens] = useState(localStorage.getItem('tokens'))
    const ref = useRef();
    useEffect(() => {
        console.log(ref)
        ref.current.innerText = localStorage.getItem('tokens') + " tokens"
    }, [tokens])

    const addToken = () => {
        setTokens(tokens - 1)
        localStorage.setItem('tokens', tokens)
        console.log(localStorage.getItem('tokens'))
    }

    return (
        <div className="token">
            <h1 ref={ref}>{tokens} tokens</h1>
            <div className="buttonGroup">
                <button id="tokenBtn" className="btn btn-lg" onClick={() => addToken()}>Add</button>
            </div>
        </div>
    )
}
