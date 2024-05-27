import {Card,Button, Modal, DropdownButton, ButtonGroup, Dropdown, Form, Spinner} from 'react-bootstrap';
import { LiaDownloadSolid } from "react-icons/lia";
import { getToken } from '../utils/localstorage';
import { token,  backend } from '../utils/config';
import { useState } from "react"
import {postToBackend} from "../utils/backendCalls"

function FileItem({file}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false) 
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
        setLoading(true)
        let response = await postToBackend("/user/files/email", {fileId:file.id, email:toEmail}, authToken)
        if(response.status !== 200)
            alert(response.data.message)
        else
            alert("message sent")
        setLoading(false)
      }}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control value={toEmail} required onChange={(val) => setToEmail(val.target.value)} type="email" placeholder="Enter email" />
      </Form.Group>
      <div className='spiner-parent'>
       <Button disabled = {loading} variant="primary" type="submit">
        Submit
      </Button>
      {loading && <Spinner className='spiner-child' />}
      </div>
    </Form>
        </Modal.Body>
      </Modal>
      </DropdownButton>
      </Card.Body>
    </Card>
  );
}
export {FileItem}