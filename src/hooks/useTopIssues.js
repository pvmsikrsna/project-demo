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

  const fetchTopIssues = () => {
    APIs.getViewIssueCount().then(({data}) => {
      setTopIssues(data)
      setValue(Object.assign({}, value, {topIssues: data}))
    })
  }

  React.useEffect(fetchTopIssues, [])

  const [value, setValue] = React.useState({updateTopIssues, topIssues})

  return {topIssues, updateTopIssues}
}