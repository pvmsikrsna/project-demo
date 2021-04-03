import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
  withRouter
} from "react-router-dom";

import Login from "./components/login.component";
import Signup from "./components/signup.component";
import Issues from "./components/Issues";
import {APP_STATE, useLoginState} from "./hooks/useLoginState";
import NavBar2 from './components/NavBar'
import NewIssue from "./components/NewIssue";
import {APIs} from "./apis";
import ViewIssue from "./components/ViewIssue";

const Redirect = withRouter(({to, history}) => {
    React.useEffect(() => {
      history.replace(to)
    }, [])
    return <></>
  }
)
const App = () => {

  const {user, loginState, setLoginUser} = useLoginState();

  console.log({user, loginState})

  const [issueList, setIssueList] = React.useState([])

  const history = useHistory();

  const loadIssue = React.useCallback((issue) => {
    history.push(`/issue/${issue.id}`, true)
  }, [])

  const editIssue = React.useCallback((issue) => {
    history.push(`/issue/${issue.id}/edit`)
  }, [])


  const renderIssuesRoute = () => () => {
    return <Issues list={issueList}
                   onViewIssue={loadIssue} onEditIssue={editIssue}/>
  };

  let issueIdMatch = useRouteMatch({
    path: "/issue/details/:id", strict: true,
    sensitive: true
  });


  const renderIssueDetails = () => {
    let {path, url, params} = issueIdMatch;
    let matched = issueList.filter(x => x.id == params.id)
    debugger
    if (matched.length === 1) {
      return <ViewIssue issue={matched[0]}/>
    } else {
      debugger
    }
    return <h1> Failed for {JSON.stringify(params)}</h1>
  };

  const renderRoutes = () => {
    console.log({loginState})
    if (loginState === APP_STATE.LOGIN_SUCCESS) {
      return <>
        <Route path='/issue/new' component={NewIssue}/>
        <Route path='/issues' render={renderIssuesRoute()}/>
        <Route exact path='/issue/details/:id' render={renderIssueDetails}/>
        <Route path='/:any' component={Issues}/>
      </>;
    } else if (loginState === APP_STATE.LOGOUT) {
      return <>
        <Route path='/sign-in' component={Login}/>
        <Route path='/sign-up' component={Signup}/>
        <Route path='/issues' render={() => {
          return <Issues/>
        }}/>
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


  React.useEffect(() => {
    APIs.getIssues({description_like: issueFilter.trim()}).then(({data: list}) => {
      setIssueList(list)
    })
  }, [issueFilter])

  React.useEffect(() => {

  }, [issueIdMatch])

  return <Router forceRefresh={true}>
    <div className="App">
      <NavBar2 search={issueFilter} onSearchChange={handleFilterChange} loginState={loginState}/>

      <div className="outer">
        <div className="inner">
          <Switch>
            {renderRoutes()}
          </Switch>
        </div>
      </div>
    </div>
  </Router>;
};

export default App;
