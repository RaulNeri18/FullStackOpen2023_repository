import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const ModalAlert = ({ show, handleClose, handleRemove, title, message }) => {

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRemove}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalAlert