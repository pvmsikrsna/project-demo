import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import Issue from "./Issue";
import {noop} from "../utils";

export default ({list = [], onViewIssue = noop, onEditIssue = noop}) => {
  return <Container fluid>
    <Row>
      {list.map(x => <Col xs={12} sm={12} md={4}>
        <Issue issue={x} onEditIssue={onEditIssue} onViewIssue={onViewIssue}/>
      </Col>)}
    </Row>
  </Container>

}