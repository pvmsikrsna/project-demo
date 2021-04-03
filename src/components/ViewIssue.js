import React from "react";
import {Col, Form, Row} from "react-bootstrap";

export default ({issue}) => {
  return <Form>
    <Form.Group as={Row} controlId="issueId">
      <Form.Label column sm={2}>
        ID
      </Form.Label>
      <Col sm={10}>
        <Form.Control type="text" disabled value={issue.id}/>
      </Col>
    </Form.Group>

    <Form.Group as={Row} controlId="issueDescription">
      <Form.Label column sm={2}>
        Description
      </Form.Label>
      <Col sm={10}>
        <Form.Control as={'textarea'} disabled value={issue.description}/>
      </Col>
    </Form.Group>


    <Form.Group as={Row} controlId="issueStatus">
      <Form.Label column sm={2}>
        Status
      </Form.Label>
      <Col sm={10}>
        <Form.Control type="text" disabled value={issue.status}/>
      </Col>
    </Form.Group>


    <Form.Group as={Row} controlId="severity">
      <Form.Label column sm={2}>
        Severity
      </Form.Label>
      <Col sm={10}>
        <Form.Control type="text" disabled value={issue.severity}/>
      </Col>
    </Form.Group>


    <Form.Group as={Row} controlId="created">
      <Form.Label column sm={2}>
        Created
      </Form.Label>
      <Col sm={10}>
        <Form.Control type="text" disabled value={issue.created}/>
      </Col>
    </Form.Group>

    <Form.Group as={Row} controlId="resolved">
      <Form.Label column sm={2}>
        Resolved
      </Form.Label>
      <Col sm={10}>
        <Form.Control type="text" disabled value={issue.resolved}/>
      </Col>
    </Form.Group>

  </Form>
}