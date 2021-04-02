import React from "react";
import {APIs} from "../apis";

export const APP_STATE = {
  CHECKING_LOGIN: 'CHECKING_LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
}
export const useLoginState = () => {

  const [loginState, setLoginState] = React.useState(APP_STATE.CHECKING_LOGIN)
  const [user, setUser] = React.useState(null);

  const [value, setValue] = React.useState({user, loginState})

  React.useEffect(() => {
    let user = localStorage.getItem('user') || 'admin@issues.com'

    APIs.findUserByEmail(user).then(x => {
      setValue(Object.assign({}, value, {loginState: APP_STATE.LOGIN_SUCCESS, user}))
      setLoginState(APP_STATE.LOGIN_SUCCESS)
      setUser(x);
    }).catch(() => {
      setValue(Object.assign({}, value, {loginState: APP_STATE.LOGOUT, user: null}))
    })
  }, [])

  return value
}