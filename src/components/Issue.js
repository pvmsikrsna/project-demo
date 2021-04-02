import React from "react";
import {Button, Card, ListGroup, ListGroupItem} from "react-bootstrap";

export default ({issue = {}, showCreated, showResolved, showSeverity, showStatus}) => {
  let {id, description, severity, status, created, resolved} = issue || {}
  return <Card style={{width: '18rem'}} className={'issue'}>
    <Card.Header>Id - {id}</Card.Header>
    <Card.Body>
      <Card.Text className='issue-description'>
        {description}
      </Card.Text>
      <ListGroup className="list-group-flush">
        <ListGroupItem className={'issue-detail'}><b>Status</b> {status}</ListGroupItem>
        <ListGroupItem className={'issue-detail'}><b>Severity</b> {severity}</ListGroupItem>
        <ListGroupItem className={'issue-detail'}><b>Created</b> {created}</ListGroupItem>
        <ListGroupItem className={'issue-detail'}><b>Resolved</b> {resolved}</ListGroupItem>
        <ListGroupItem>
          <Button size='sm' variant="primary" className='view-issue'>View Issue</Button>
          <Button size='sm' variant="dark" className='edit-issue'>Edit Issue</Button>
        </ListGroupItem>
      </ListGroup>
    </Card.Body>
  </Card>
}