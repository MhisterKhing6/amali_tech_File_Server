import {Button} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {Navbar} from 'react-bootstrap';
import {NavDropdown} from 'react-bootstrap';
import {Offcanvas} from 'react-bootstrap';
import logo from "../assets/logo-color1.png"

function AdminNavBar() {
  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-dark p-2 mb-3">
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
                  Amalitech File Server
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className='p-2'>
                <Nav className="justify-content-end flex-grow-1 pe-3 navList">
                  <Nav.Link href="/admin/dashboard">Home</Nav.Link>
                  <Nav.Link href="/admin/upload-file">Upload</Nav.Link>
                  <Nav.Link href="/admin/view-file">View</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export {AdminNavBar};