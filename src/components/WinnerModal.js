import Modal from 'react-bootstrap/Modal'
import { useEffect, useState } from 'react'

export const WinnerModal = ({ winner, setWinner, totalCards}) => {
    console.log(totalCards)
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (winner !== '') setShow(true)
        else setShow(false)
    }, [winner])

    useEffect(() => {
        if (show === false)
            setWinner("")
    }, [show]
    )
    return (
        <>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title className='justify-content-center'>
                    <h4>The winner is: {winner}</h4>
                    <h5>Your total: {totalCards.playerTotal}</h5>
                    <h5>Dealers total: {totalCards.dealerTotal}</h5>
                    </Modal.Title>
                </Modal.Header>
            </Modal>
        </>
    )
}
