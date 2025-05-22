
import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Fragment } from 'react';

function Header() {
  return (
    <>
    <Container>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#" className="mx-auto">Apex Legends Tracker</Navbar.Brand>
        </Container>
      </Navbar>
    </Container>
    </>
  );
}

export default Header