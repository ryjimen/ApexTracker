
import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import DarkMode from './DarkMode'; // Import DarkMode component if needed
function Header() {
  return (
    <>
    <Container>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#" className="mx-auto">Apex Legends Tracker</Navbar.Brand>
              <DarkMode /> {/* Optional: Include DarkMode component for theme toggle */}  
        </Container>
      </Navbar>
    </Container>

    </>
  );
}

export default Header