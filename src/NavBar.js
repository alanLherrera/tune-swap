import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react'


function NavBar() {

let [signedIn, setSignedIn] = useState(<Nav.Link as={Link} to="/sign-in">Sign-In</Nav.Link>)

function logOut () {
  fetch('http://localhost:3000/api/logout')
  setSignedIn(<Nav.Link as={Link} to="/sign-in">Sign-In</Nav.Link>)
}


  useEffect(()=> {
    fetch('http://localhost:3000/api/isloggedin').then((response) => response.text()).then(res => {
      res = JSON.parse(res)
      if (res[0] === '1'){
        setSignedIn(<><Nav.Link as={Link}>User: {res[1]}</Nav.Link><Button className='logout' variant='sucess' onClick={logOut}>LogOut</Button></>)
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