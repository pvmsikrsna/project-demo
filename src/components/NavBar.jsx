import React from 'react'
import {Form, FormControl, Nav, Navbar} from "react-bootstrap";

const NavBar = ({search, onSearchChange, appState}) => {
  return <>
    <Navbar bg="light" expand="md">
      <Navbar.Brand href="#home">Issues Server</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/issues">Issues</Nav.Link>
        </Nav>
        <Form>
          <FormControl type="text" value={search} onChange={onSearchChange}
                       placeholder="Search" className="mr-sm-2" />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  </>
}

export default NavBar;