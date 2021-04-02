import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import Issue from "./Issue";

export default () => {
  return <Container fluid>
    <Row>
      <Col>
        <Issue/>
      </Col>
      <Col>
        <Issue/>
      </Col>
      <Col>
        <Issue/>
      </Col>
    </Row>
  </Container>
}