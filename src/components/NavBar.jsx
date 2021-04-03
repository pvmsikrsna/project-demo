import React from 'react'
import {Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {APP_STATE} from "../hooks/useLoginState";

const NavBar = ({search, onSearchChange, loginState, onLogout}) => {

  const renderAuthenticatedControls = () => {
    return loginState === APP_STATE.LOGIN_SUCCESS ?
    <>
      <Form>
        <FormControl type="text" value={search} onChange={onSearchChange}
                     placeholder="Search" className="mr-sm-2"/>
      </Form>

      <Nav.Link onClick={onLogout}>Logout</Nav.Link>
    </> : <></>;
  };

  return <>
    <Navbar bg="light" expand="md">
      <Navbar.Brand href="/issues">Issues Server</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/issues">Issues</Nav.Link>
        </Nav>
        {renderAuthenticatedControls()}
      </Navbar.Collapse>
    </Navbar>
  </>
}

export default NavBar;