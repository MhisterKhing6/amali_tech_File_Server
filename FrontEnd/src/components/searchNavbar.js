import {Button, Container, Form, Nav, Navbar, Offcanvas} from 'react-bootstrap';
import logo from "../assets/logo-color1.png"

function CustomerNavBar() {
  return (
    <>
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
                  <Nav.Link href="#action2">Send Email</Nav.Link>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export  {CustomerNavBar};