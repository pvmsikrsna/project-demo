import React from "react";
import {APIs} from "../apis";

export const useTopIssues = () => {

  const updateTopIssues = React.useCallback((issueId) => {
    APIs.getViewIssueCount().then(({data}) => {
      let key = issueId + '';
      data[key] = (data[key] || 0) + 1;
      APIs.updateTopIssue(data).then(fetchTopIssues);
    })
  }, [])

  const [topIssues, setTopIssues] = React.useState({});

  const fetchTopIssues = React.useCallback(() => {
    APIs.getViewIssueCount().then(({data}) => {
      debugger
      setTopIssues(data)
      Object.assign({}, value, {topIssues: data})
    })
  }, [])

  React.useEffect(fetchTopIssues, [])

  const [value] = React.useState({updateTopIssues, fetchTopIssues, topIssues})

  return value
}