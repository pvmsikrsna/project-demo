import React from 'react'
import {Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {LOGIN_STATE} from "../hooks/useLoginState";

const NavBar = ({user, search, onSearchChange, loginState, onLogout, onAddNewIssue}) => {

  const renderAuthenticatedControls = () => {
    return loginState === LOGIN_STATE.LOGIN_SUCCESS ?
    <>
      <Form>
        <FormControl type="text" value={search} onChange={onSearchChange}
                     placeholder="Search" className="mr-sm-2"/>
      </Form>
       <span className={'username'}>{`${user.firstName} ${user.lastName}`}</span>
      <Nav.Link onClick={onAddNewIssue}>Add Issue</Nav.Link>
      <Nav.Link href={'/issues/top'}>Top Issues</Nav.Link>
      <Nav.Link onClick={onLogout}>Logout</Nav.Link>
    </> : <>
        <Nav.Link href='/sign-in'>Sign In</Nav.Link>
        <Nav.Link href='/sign-up'>Sign Up</Nav.Link>
      </>;
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