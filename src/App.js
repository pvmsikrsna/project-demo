import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

// import Login from "./components/login.component";
import Login from "./components/Login";
import Issues from "./components/Issues";
import NewIssue from "./components/NewIssue";
import {APP_STATE, useLoginState} from "./hooks/useLoginState";
import NavBar2 from './components/NavBar'
import {Col, Container, Row} from "react-bootstrap";


const App = () => {
  const {user, loginState} = useLoginState();

  return <Router>
    <div className="App">
      <NavBar2/>

      <div className="outer">
        <div className="inner">
          <Container>
            <Row>
              <Col>
                <Switch>
                  <Route exact path='/' component={Login}/>
                  <Route exact path='/issues' component={Issues}/>
                  <Route exact path='/new' component={NewIssue}/>
                  <Route path="/sign-in" component={Login}/>
                  <Route path="/login" component={Login}/>
                  {/*<Route path="/sign-up" component={SignUp}/>*/}
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
