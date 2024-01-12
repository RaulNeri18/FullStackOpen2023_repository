import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

const BlogFormModal = (props) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant="primary" onClick={handleShow} size="sm">
        {props.buttonName}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={props.primaryButton}>
          <Modal.Header closeButton>
            <Modal.Title>{props.modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {props.children}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default BlogFormModal