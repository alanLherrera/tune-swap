import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react'

function NavBar() {

let [signedIn, setSignedIn] = useState(<Nav.Link as={Link} to="/sign-in">Sign-In</Nav.Link>)


  useEffect(()=> {
    fetch('http://localhost:3000/api/isloggedin').then((response) => response.text()).then(res => {
      console.log(res)
      if (res === '1'){
        setSignedIn(<Nav.Link as={Link}>Logged In</Nav.Link>)
    }
  })
  }, [])

  return (
    <>
      <Navbar className='Nav' sticky="top" variant="dark">
        <Container>
          <Navbar.Brand href="/">Tune-Swap</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/features">Features</Nav.Link>
            {signedIn}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;