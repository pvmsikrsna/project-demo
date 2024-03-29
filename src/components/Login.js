import React from "react";
import {Button, Col, Form, FormControl, InputGroup} from "react-bootstrap";

export default Login => {
  return <Form>
    <Form.Row className="align-items-center">
      <Col sm={3} className="my-1">
        <Form.Label htmlFor="inlineFormInputName" srOnly>
          Name
        </Form.Label>
        <Form.Control id="inlineFormInputName" placeholder="Jane Doe"/>
      </Col>
      <Col sm={3} className="my-1">
        <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
          Username
        </Form.Label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>@</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl id="inlineFormInputGroupUsername" placeholder="Username"/>
        </InputGroup>
      </Col>
      <Col xs="auto" className="my-1">
        <Form.Check type="checkbox" id="autoSizingCheck2" label="Remember me"/>
      </Col>
      <Col xs="auto" className="my-1">
        <Button type="submit">Submit</Button>
      </Col>
    </Form.Row>
  </Form>
}