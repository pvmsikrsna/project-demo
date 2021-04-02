import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch, withRouter} from "react-router-dom";

import Login from "./components/login.component";
import Signup from "./components/signup.component";
// import Login from "./components/Login";
import Issues from "./components/Issues";
import NewIssue from "./components/NewIssue";
import {APP_STATE, useLoginState} from "./hooks/useLoginState";
import NavBar2 from './components/NavBar'
import {Col, Container, Row} from "react-bootstrap";

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

  function renderRoutes() {
    if (loginState === APP_STATE.LOGIN_SUCCESS) {
      return <>
        <Route exact path='/issues' component={Issues}/>
        <Route exact path='/:any' component={Issues}/>
      </>;
    } else if (loginState === APP_STATE.LOGOUT) {
      return <>
        <Route exact path='/sign-in' component={Login}/>
        <Route exact path='/sign-up' component={Signup}/>
        <Route exact path='/issues' component={Issues}/>
        <Route exact path='/:any' render={() => {
          return <Redirect to={'/sign-in'}/>
        }
        }/>
      </>
    } else {
      return <>
        <h1>Checking user</h1>
      </>
    }
  }

  return <Router>
    <div className="App">
      <NavBar2/>

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
