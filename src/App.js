import React, {Suspense} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Route, Switch, useHistory, useRouteMatch, withRouter} from "react-router-dom";

import {LOGIN_STATE, useLoginState} from "./hooks/useLoginState";
import {APIs} from "./apis";
import {useTopIssues} from "./hooks/useTopIssues";
import NavBar2 from './components/NavBar'
import {toast, Toaster} from "react-hot-toast";

const NewIssue =  React.lazy(() => import("./components/NewIssue"));
const Issues =  React.lazy(() => import("./components/Issues"));
const Login =  React.lazy(() => import("./components/login.component"));
const Signup =  React.lazy(() => import("./components/signup.component"));
const ViewIssue =  React.lazy(() => import("./components/ViewIssue"));
const TopIssues =  React.lazy(() => import("./components/TopIssues"));

const Redirect = withRouter(({to, history, exclude}) => {
    React.useEffect(() => {
      if(!exclude || exclude.indexOf(history.location.pathname) === -1){
        history.replace(to)
      }
    }, [])
    return <></>
  }
)
const App = (props, context) => {

  const {user, loginState, clearLogin, setLoginUser} = useLoginState();
  
  const {updateTopIssues, fetchTopIssues, topIssues} = useTopIssues();

  const [issueList, setIssueList] = React.useState([])

  const history = useHistory();

  const loadIssue = React.useCallback((issue) => {
    if (loginState === LOGIN_STATE.LOGOUT) {
      history.push(`/sign-in`)
    } else {
      updateTopIssues(issue.id)
      history.push(`/issue/${issue.id}`)
    }
  }, [])

  const editIssue = React.useCallback((issue) => {
    if (loginState === LOGIN_STATE.LOGOUT) {
      history.push(`/sign-in`)
    } else {
      history.push(`/issue/${issue.id}/edit`)
    }
  }, [])

  // List Issue Handler
  const renderSignup = () => {
    return <Suspense fallback={<div>Loading...</div>}>
      <Signup onSignup={e => {
        history.push('/sign-in')
      }}/>
    </Suspense>
  };

  // List Issue Handler
  const renderIssuesRoute = () => {
    return <Suspense fallback={<div>Loading...</div>}><Issues list={issueList} onViewIssue={loadIssue} onEditIssue={editIssue}/>
    </Suspense>
  };

  // List Issue Handler
  const renderTopIssuesRoute = () => {
    return <Suspense fallback={<div>Loading...</div>}>
      <TopIssues issues={issueList}/>
    </Suspense>
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
      toast.success(`Issue - ${issue.id} registered`)
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
      toast.success(`Issue - ${issue.id} updated`)
    });
  };

  // Create New Issue Handler
  const renderNewIssueRoute = () => {
    return <Suspense fallback={<div>Loading...</div>}>
      <NewIssue onSubmit={registerNewIssue}/>
    </Suspense>
  };

  // Edit Issue Handler
  const renderEditIssueRoute = () => {
    let {path, url, params} = issueIdMatch;
    let matched = issueList.filter(x => x.id == params.id)
    if (matched.length === 1) {
      return <Suspense fallback={<div>Loading...</div>}>
        <NewIssue issue={matched[0]}
                  onSubmit={updateIssue}/>
      </Suspense>
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
      return <Suspense fallback={<div>Loading...</div>}>
        <ViewIssue issue={matched[0]}/>
      </Suspense>
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
    if (loginState === LOGIN_STATE.LOGIN_SUCCESS) {
      return <>
        <Route exact path='/issue/new' component={renderNewIssueRoute}/>
        <Route exact path='/issues' render={renderIssuesRoute}/>
        <Route exact path='/issues/top' render={renderTopIssuesRoute}/>
        <Route exact path='/issue/:id' render={renderIssueDetails}/>
        <Route exact path='/issue/:id/edit' render={renderEditIssueRoute}/>
        <Route exact path='/:any' render={() => <Redirect to={'/issues'}/>}/>
      </>;
    } else if (loginState === LOGIN_STATE.LOGOUT) {
      return <>
        <Route exact path='/issues' render={renderIssuesRoute}/>
        <Route exact path='/sign-in' render={() => {
          return <Suspense fallback={<div>Loading...</div>}>
            <Login onLogin={user => {
            setLoginUser(user)
            history.replace('/issues');
          }}/>
          </Suspense>
        }}/>
        <Route exact path='/sign-up' render={renderSignup}/>
        <Route path='/' render={() => {
          return <Redirect to='/sign-in' exclude={['/issues', '/sign-up']}/>
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
    <NavBar2 search={issueFilter}
             user={user}
             onLogout={clearLogin} onAddNewIssue={goToCreateNewIssue}
             onSearchChange={handleFilterChange} loginState={loginState}/>

    <div className="outer">
      <div className="inner">
        <Switch>
          {renderRoutes()}
        </Switch>
      </div>
    </div>
    <Toaster />
  </div>
};

export default App;
