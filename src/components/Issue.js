import React from "react";
import {Button, Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {noop} from "../utils";


export default ({
                  issue = {},
                  onViewIssue = noop, onEditIssue = noop,
                  showId, showStatus, showDescription,
                }) => {
  let {id, description, severity, status, created, resolved} = issue || {}

  const onViewIssueCb = React.useCallback((event) => {
    onViewIssue(issue);
  }, [issue, onViewIssue])

  const onEditIssueCb = React.useCallback((event) => {
    onEditIssue(issue);
  }, [issue, onEditIssue])

  const renderStatus = () => {
    return showStatus ? <Card.Subtitle
      className="mb-2 text-muted">{status} - {severity}</Card.Subtitle> : null;
  };

  const renderDescription = () => {
    return showDescription ? <Card.Text
      className={'issue-description'}>{description}</Card.Text> : null;
  };

  const renderId = () => {
    return showId ? <Card.Title>ID - {id}</Card.Title> : null;
  };

  return <Card className={'issue'}>
    <Card.Body>
      {renderId()}
      {renderStatus()}
      {renderDescription()}
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