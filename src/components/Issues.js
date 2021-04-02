import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import Issue from "./Issue";

export default ({list = []}) => {
  return <Container fluid>
    <Row>
      {list.map(x => <Col><Issue issue={x}/></Col>)}
    </Row>
  </Container>
}