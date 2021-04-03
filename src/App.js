import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Route, Switch, useHistory, useRouteMatch, withRouter} from "react-router-dom";

import Login from "./components/login.component";
import Signup from "./components/signup.component";
import Issues from "./components/Issues";
import {APP_STATE, useLoginState} from "./hooks/useLoginState";
import NavBar2 from './components/NavBar'
import NewIssue from "./components/NewIssue";
import {APIs} from "./apis";
import ViewIssue from "./components/ViewIssue";
import {useTopIssues} from "./hooks/useTopIssues";


const Redirect = withRouter(({to, history}) => {
    React.useEffect(() => {
      history.replace(to)
    }, [])
    return <></>
  }
)
const App = (props, context) => {

  const {user, loginState, clearLogin} = useLoginState();
  const {updateTopIssues, fetchTopIssues, topIssues} = useTopIssues();

  const [issueList, setIssueList] = React.useState([])

  const history = useHistory();

  const loadIssue = React.useCallback((issue) => {
    updateTopIssues(issue.id)
    history.push(`/issue/${issue.id}`, true)
  }, [])

  const editIssue = React.useCallback((issue) => {
    history.push(`/issue/${issue.id}/edit`)
  }, [])

  // List Issue Handler
  const renderIssuesRoute = () => {
    return <Issues list={issueList} onViewIssue={loadIssue} onEditIssue={editIssue}/>
  };

  let issueIdMatch = useRouteMatch({
    path: "/issue/:id", strict: true,
    sensitive: true
  });

  // View Issue route handler
  const renderIssueDetails = () => {
    let {path, url, params} = issueIdMatch;
    let matched = issueList.filter(x => x.id == params.id)
    if (matched.length === 1) {
      return <ViewIssue issue={matched[0]}/>
    } else {
    }
    return <h1> Failed for {JSON.stringify(params)}</h1>
  };

  // Render the routes
  const renderRoutes = () => {
    console.log({loginState})
    if (loginState === APP_STATE.LOGIN_SUCCESS) {
      return <>
        <Route exact path='/issue/new' component={NewIssue}/>
        <Route exact path='/issues' render={renderIssuesRoute}/>
        <Route path='/issue/:id' render={renderIssueDetails}/>
        <Route exact path='/:any' render={() => <Redirect to={'/issues'}/>}/>
      </>;
    } else if (loginState === APP_STATE.LOGOUT) {
      return <>
        <Route path='/sign-in' render={() => {
          return <Login onLogin={user => {
            history.replace('/issues');
          }}/>
        }}/>
        <Route path='/sign-up' component={Signup}/>
        <Route path='/issues' render={renderIssuesRoute}/>
        <Route path='/:any' render={() => {
          return <Redirect to={'/sign-in'}/>
        }}/>
      </>
    } else {
      return <>
        <h1>Checking user</h1>
      </>
    }
  };

  const [issueFilter, setIssueFilter] = React.useState('');

  const handleFilterChange = React.useCallback((event) => {
    setIssueFilter(event.target.value);
  }, [])

  // When search filter changes, filter the issues
  React.useEffect(() => {
    APIs.getIssues({description_like: issueFilter.trim()}).then(({data: list}) => {
      setIssueList(list)
    })
  }, [issueFilter])

  React.useEffect(() => {

  }, [issueIdMatch])

  return <div className="App">
    <NavBar2 search={issueFilter} onLogout={clearLogin}
             onSearchChange={handleFilterChange} loginState={loginState}/>

    <div className="outer">
      <div className="inner">
        <Switch>
          {renderRoutes()}
        </Switch>
      </div>
    </div>
  </div>
};

export default App;
