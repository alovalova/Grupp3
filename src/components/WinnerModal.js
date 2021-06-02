import Modal from 'react-bootstrap/Modal'
import { useEffect, useState } from 'react'

export const WinnerModal = ({ winner, setWinner, totalCards }) => {
    // Modal only shows when there is a winner
    const [show, setShow] = useState(false)
    useEffect(() => {
        if (winner !== '') setShow(true)
        else setShow(false)
    }, [winner])

    // Clear winner once modal closes
    useEffect(() => {
        if (show === false)
            setWinner("")
    }, [show]
    )
    return (
        <>
            <Modal className="modal"
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title className='justify-content-center'>
                        {totalCards !== "" ? (<div><h4>The winner is:</h4> <h2>{winner}</h2><h5>Your total: {totalCards.playerTotal}</h5><h5>Dealer total: {totalCards.dealerTotal}</h5></div>) : ("")}
                    </Modal.Title>
                </Modal.Header>
            </Modal>
        </>
    )
}
