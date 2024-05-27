import {Card,Button, Modal, DropdownButton, ButtonGroup, Dropdown, Form} from 'react-bootstrap';
import { LiaDownloadSolid } from "react-icons/lia";
import { getToken } from '../utils/localstorage';
import { token,  backend } from '../utils/config';
import { useState } from "react"
import {postToBackend} from "../utils/backendCalls"

function FileItem({file}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let [toEmail, setToEmail] = useState("")

let authToken = getToken(token.authToken) ? getToken(token.customerTokenKey) : getToken(token.adminTokenKey)
  return (
    <Card>
      <Card.Header as="h5">{file.title}</Card.Header>
      <Card.Body>
        <Card.Text>
          {file.description}
        </Card.Text>
        <DropdownButton as={ButtonGroup} title={<LiaDownloadSolid style={{width:"80px", height:"30px"}}/>} id="bg-nested-dropdown">
        <Dropdown.Item> Download</Dropdown.Item>
        <Dropdown.Item onClick={handleShow}>Email</Dropdown.Item>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      <Form onSubmit={async (val) => {
        val.preventDefault()
        let response = await postToBackend("/user/files/email", {fileId:file.id, email:toEmail}, authToken)
        if(response.status !== 200)
            alert(response.data.message)
        else
            alert("message sent")
      }}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={(val) => setToEmail(val.target.value)} type="email" placeholder="Enter email" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </DropdownButton>
      </Card.Body>
    </Card>
  );
}
export {FileItem}