import Modal from 'react-bootstrap/Modal'
import { useEffect, useState } from 'react'

export const WinnerModal = ({ winner }) => {
    const [show, setShow] = useState(false);
    console.log(winner)
    useEffect(() => {
        if (winner != '') setShow(true)
        else setShow(false)
    }, [winner])
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
                        The winner is {winner}
                    </Modal.Title>
                </Modal.Header>
            </Modal>
        </>
    )
}
