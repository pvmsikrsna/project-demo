import React from "react";
import {Button, Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {noop} from "../utils";


export default ({
                  issue = {},
                  onViewIssue = noop, onEditIssue = noop,
                  showCreated, showResolved, showSeverity, showStatus
                }) => {
  let {id, description, severity, status, created, resolved} = issue || {}

  const onViewIssueCb = React.useCallback((event) => {
      onViewIssue(issue);
  }, [issue, onViewIssue])

  const onEditIssueCb = React.useCallback((event) => {
      onEditIssue(issue);
  }, [issue, onEditIssue])

  return <Card className={'issue'}>
    <Card.Body>
      <Card.Title>ID - {id}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{status} - {severity}</Card.Subtitle>
      <Card.Text className={'issue-description'}>{description}</Card.Text>
    </Card.Body>
    <Card.Body>
      <Button size='sm' variant="primary" className='view-issue' onClick={onViewIssueCb}>
        View Issue
      </Button>
      <Button size='sm' variant="dark" onClick={onEditIssueCb} className='edit-issue'>
        Edit Issue
      </Button>
    </Card.Body>
  </Card>
}