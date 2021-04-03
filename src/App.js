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
import TopIssues from "./components/TopIssues";


const Redirect = withRouter(({to, history, exclude}) => {
    React.useEffect(() => {
      if(exclude !== history.location.pathname){
        history.replace(to)
      }
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
    if (loginState === APP_STATE.LOGOUT) {
      history.push(`/sign-in`)
    } else {
      updateTopIssues(issue.id)
      history.push(`/issue/${issue.id}`)
    }
  }, [])

  const editIssue = React.useCallback((issue) => {
    if (loginState === APP_STATE.LOGOUT) {
      history.push(`/sign-in`)
    } else {
      history.push(`/issue/${issue.id}/edit`)
    }
  }, [])

  // List Issue Handler
  const renderIssuesRoute = () => {
    return <Issues list={issueList} onViewIssue={loadIssue} onEditIssue={editIssue}/>
  };
  
  // List Issue Handler
  const renderTopIssuesRoute = () => {
    return <TopIssues/>
  };

  // When search filter changes, filter the issues
  let fetchIssuesList = () => {
    return APIs.getIssues({description_like: issueFilter.trim()})
  }

  let fetchAndUpdateIssueList = () => {
    fetchIssuesList().then(({data: list}) => {
      setIssueList(list)
    })
  }


  let registerNewIssue = (issue, values, {setSubmitting, resetForm}) => {
    // issue is null, since it's a new issue
    setSubmitting(true);
    let {description, status, severity, created, updated, createdBy} = values
    APIs.createIssue(description, status, severity, created, updated, createdBy).then(x => {
      // alert(JSON.stringify(values, null, 2));
      fetchIssuesList().then(({data: list}) => {
        resetForm();
        setSubmitting(false);
        setIssueList(list)
        history.push(`/issues`)
      })
    });
  };


  let updateIssue = (issue, values, {setSubmitting, resetForm}) => {
    setSubmitting(true);
    let {description, status, severity, created, resolved, } = values
    let payload = Object.assign({}, issue, {description, status, severity, created, resolved},)
    debugger
    APIs.updateIssue(payload).then(x => {
      // alert(JSON.stringify(values, null, 2));
      fetchIssuesList().then(({data: list}) => {
        resetForm();
        setIssueList(list)
        history.push(`/issue/${issue.id}`)
      })
    });
  };

  // Create New Issue Handler
  const renderNewIssueRoute = () => {
    return <NewIssue onSubmit={registerNewIssue}/>
  };

  // Edit Issue Handler
  const renderEditIssueRoute = () => {
    let {path, url, params} = issueIdMatch;
    let matched = issueList.filter(x => x.id == params.id)
    if (matched.length === 1) {
      return <NewIssue issue={matched[0]} onSubmit={updateIssue}/>
    }
    return <></>
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
    }
    return <></>
  };

  const goToCreateNewIssue = () => {
    setIssueFilter('');
    history.push('/issue/new')
  }
  // Render the routes
  const renderRoutes = () => {
    console.log({loginState})
    if (loginState === APP_STATE.LOGIN_SUCCESS) {
      return <>
        <Route exact path='/issue/new' component={renderNewIssueRoute}/>
        <Route exact path='/issues' render={renderIssuesRoute}/>
        <Route exact path='/issues/top' render={renderTopIssuesRoute}/>
        <Route exact path='/issue/:id' render={renderIssueDetails}/>
        <Route exact path='/issue/:id/edit' render={renderEditIssueRoute}/>
        <Route exact path='/:any' render={() => <Redirect to={'/issues'}/>}/>
      </>;
    } else if (loginState === APP_STATE.LOGOUT) {
      return <>
        <Route exact path='/issues' render={renderIssuesRoute}/>
        <Route exact path='/sign-in' render={() => {
          return <Login onLogin={user => {
            history.replace('/issues');
          }}/>
        }}/>
        <Route exact path='/sign-up' component={Signup}/>
        <Route path='/' render={() => {
          return <Redirect to='/sign-in' exclude='/issues'/>
        }}/>
      </>
    } else {
      return <>
      </>
    }
  };

  const [issueFilter, setIssueFilter] = React.useState('');

  const handleFilterChange = React.useCallback((event) => {
    setIssueFilter(event.target.value);
  }, [])


  React.useEffect(fetchAndUpdateIssueList, [issueFilter])

  React.useEffect(() => {

  }, [issueIdMatch])

  return <div className="App">
    <NavBar2 search={issueFilter} onLogout={clearLogin} onAddNewIssue={goToCreateNewIssue}
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
