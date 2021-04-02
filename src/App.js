import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch, withRouter} from "react-router-dom";

import Login from "./components/login.component";
import Signup from "./components/signup.component";
import Issues from "./components/Issues";
import {APP_STATE, useLoginState} from "./hooks/useLoginState";
import NavBar2 from './components/NavBar'
import {Col, Container, Row} from "react-bootstrap";
import NewIssue from "./components/NewIssue";
import {APIs} from "./apis";

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

  const onLoginSuccess = (user) => {
    setLoginUser(user);
  }

  const [list, setList] = React.useState([])



  function renderRoutes() {
    if (loginState === APP_STATE.LOGIN_SUCCESS) {
      return <>
        <Route exact path='/issues' render={() => {
          return <Issues list={list}/>
        }}/>
        <Route exact path='/issue/new' component={NewIssue}/>
        <Route exact path='/:any' component={Issues}/>
      </>;
    } else if (loginState === APP_STATE.LOGOUT) {
      return <>
        <Route exact path='/sign-in' component={Login}/>
        <Route exact path='/sign-up' component={Signup}/>
        <Route exact path='/issues' render={() => {
          return <Issues />
        }}/>
        <Route exact path='/:any' render={() => {
          return <Redirect to={'/sign-in'}/>
        }}/>
      </>
    } else {
      return <>
        <h1>Checking user</h1>
      </>
    }
  }

  const [issueFilter, setIssueFilter]  = React.useState('');

  const handleFilterChange = React.useCallback((event) => {
    setIssueFilter(event.target.value);
  }, [])


  React.useEffect(() => {
    APIs.getIssues({description_like : issueFilter.trim()}).then(({data: list}) => {
      setList(list)
    })
  },[issueFilter])

  return <Router>
    <div className="App">
      <NavBar2 search={issueFilter} onSearchChange={handleFilterChange} loginState={loginState}/>

      <div className="outer">
        <div className="inner">
          <Container>
            <Row>
              <Col>
                <Switch>
                  {renderRoutes()}
                </Switch>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  </Router>;
};

export default App;
