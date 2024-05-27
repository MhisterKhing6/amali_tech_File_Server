import {Button, Container, Form, Nav, Navbar, Offcanvas} from 'react-bootstrap';
import { ViewFiles } from './viewFiles';
import logo from "../assets/logo-color1.png"
import {useState, useEffect} from "react"
import {getFromBackend} from "../utils/backendCalls"
import { getToken } from '../utils/localstorage';
import { token } from '../utils/config';
import { SpinerGrow } from "./spinerGrow"
const readFiles = async (setFiles, changeState) => {
  try{
    let files = await getFromBackend("/user/search/files?page=1&limit=50", getToken(token.customerTokenKey))
    if(files.status !== 200)
        alert(files.data.message)
    else {
      setFiles(files.data.response)
    }
  }catch(err){
    console.log(err)
  }
  changeState(false)
}

function CustomerFeed() {
  const [files, setFiles] = useState([])
  const [startSpiner, setSpiner] = useState(true)
  const [pattern, setPattern] = useState("")
  useEffect(() => {
    readFiles(setFiles, setSpiner)
  }, [])
  return (
    <>
    <Container fluid>
      {['md'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
          <Navbar.Brand style={{fontSize: "0.9rem"}} className='p-2' href="#">
                <div className='d-flex justify-content-center align-items-center'>
                    <div  className="d-inline-block" style={{width:"60px", height: "60px"}}>
                      <img className="img-fluid" src={logo} /></div>
                    <p style={{fontSize: "1.1rem", fontWeight:"bolder"}} className='text-primary d-inline-block  mx-3'>Amalitech File Server </p>
                </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  AmaliTech File Server
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Home</Nav.Link>
                </Nav>
                <Form className="d-flex" onSubmit={(val) => {
                  
                }}>
                  <Form.Control
                    onChange={async (val) => {
                      setPattern(pattern)
                      let files  = await getFromBackend(`/user/search/files?page=1&limit=20&title=${val.target.value}`, getToken(token.customerTokenKey))
                      if(files.status === 200)
                        setFiles(files.data.response)
                    }}
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    required
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      {startSpiner && <SpinerGrow text="loading Files"/> }
      {!startSpiner &&  <ViewFiles files={files} /> }
      </Container>
    </>
  );
}

export  {CustomerFeed};