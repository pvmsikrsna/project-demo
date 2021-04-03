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


  let recheck = () => {
    let user = localStorage.getItem('user')
    APIs.findUserByEmail(user).then(({data: users}) => {
      if (users.length > 0) {
        setValue(Object.assign({}, value, {loginState: APP_STATE.LOGIN_SUCCESS, user}))
        setLoginState(APP_STATE.LOGIN_SUCCESS)
      } else {
        setValue(Object.assign({}, value, {loginState: APP_STATE.LOGOUT, user: null}))
      }
    })
  };

  const setLoginUser = React.useCallback((user) => {
    localStorage.setItem('user', user.email)
    setLoginState(APP_STATE.LOGIN_SUCCESS);
    setValue(Object.assign({}, value, {loginState: APP_STATE.LOGIN_SUCCESS, user: user.email}))
  })


  const clearLogin = React.useCallback((user) => {
    localStorage.removeItem('user')
    setLoginState(APP_STATE.LOGOUT);
    setUser(null);
    setValue(Object.assign({}, value, {loginState: APP_STATE.LOGOUT, user: null}))
  })

  const [value, setValue] = React.useState({user, loginState, setLoginUser, clearLogin})

  React.useEffect(recheck, [])

  return value
}