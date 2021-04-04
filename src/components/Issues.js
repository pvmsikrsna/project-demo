import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import Issue from "./Issue";
import {noop} from "../utils";
import {Form} from "react-bootstrap";

export default ({list = [], onViewIssue = noop, onEditIssue = noop}) => {
  const [showStatus, setShowStatus] = React.useState(true);
  const [showDescription, setShowDescription] = React.useState(true);
  const [showId, setShowId] = React.useState(true);
  const [showCreated, setShowCreated] = React.useState(false);
  const [showResolved, setShowResolved] = React.useState(false);

  const updateStatus = e => setShowStatus(e.target.checked)
  const updateId = e => setShowId(e.target.checked)
  const updateDescription = e => setShowDescription(e.target.checked)

  return <Container fluid>
    <Form>
      <Row>
        <Col xs={12} md={3}>Data controls</Col>
        <Col xs={6} md={3}>
          <Form.Group controlId="showId">
            <Form.Check checked={showId} onChange={updateId}
              type="checkbox" label="Show ID"/>
          </Form.Group>
        </Col>
        <Col xs={6} md={3}>
          <Form.Group controlId="showStatus">
            <Form.Check checked={showStatus} onChange={updateStatus}
                        type="checkbox" label="Show Status Severity"/>
          </Form.Group>
        </Col>
        <Col xs={6} md={3}>
          <Form.Group controlId="showDescription">
            <Form.Check checked={showDescription} onChange={updateDescription}
              type="checkbox" label="Show Description"/>
          </Form.Group>
        </Col>
      </Row>
    </Form>
    <Row>
      {list.map(x => <Col xs={12} sm={12} md={4}>
        <Issue issue={x}
               showStatus={showStatus}
               showDescription={showDescription}
               showId={showId}
               onEditIssue={onEditIssue} onViewIssue={onViewIssue}/>
      </Col>)}
    </Row>
  </Container>

}