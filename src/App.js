import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

// import Login from "./components/login.component";
import Login from "./components/Login";
import SignUp from "./components/signup.component";
import Issues from "./components/Issues";
import NewIssue from "./components/NewIssue";
import {APP_STATE, useLoginState} from "./hooks/useLoginState";



const NavBar = ({loginState}) => {

  const renderSignInSignUpLinks = () => <>
    <li className="nav-item">
      <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
    </li>
  </>;


  const renderSignoutLinks = () => <>
    <li className="nav-item">
      <Link className="nav-link" to={""}>Sign out</Link>
    </li>
  </>;


  return <nav className="navbar navbar-expand-lg navbar-light fixed-top">
    <div className="container">
      <Link className="navbar-brand" to={"/sign-in"}>Issues.com</Link>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to={"/issues"}>Issues</Link>
          </li>
          {loginState === APP_STATE.LOGIN_SUCCESS ? renderSignInSignUpLinks() : renderSignInSignUpLinks()}
        </ul>
      </div>
    </div>
  </nav>;
};

const App = () => {
  const {user, loginState} = useLoginState();

  return <Router>
    <div className="App">
      {<NavBar loginState={loginState}/>}

      <div className="outer">
        <div className="inner">
          <Switch>
            <Route exact path='/' component={Login}/>
            <Route exact path='/issues' component={Issues}/>
            <Route exact path='/new' component={NewIssue}/>
            <Route path="/sign-in" component={Login}/>
            <Route path="/login" component={Login}/>
            <Route path="/sign-up" component={SignUp}/>
          </Switch>
        </div>
      </div>
    </div>
  </Router>;
};

export default App;
