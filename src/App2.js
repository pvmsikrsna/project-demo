import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {APIs} from "./apis";
import {useLoginState} from "./hooks/useLoginState";

// import Login from "./components/login.component";

const App2 = () => {

  const {user, loginState} = useLoginState();

  return <h1>User : {user}, State : {loginState}</h1>
};

export default App2;
