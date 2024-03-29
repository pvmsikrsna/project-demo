import axios from "axios";

export const API_HOST = 'http://localhost:3001'
export const API_CALL_RESULTS = {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
}

export const APIs = {
  createUser: async (firstName, lastName, email, password, location, contactNo) => {
    let payload = {
      firstName, lastName, email, password, location, contactNo
    }
    await axios.post(API_HOST + '/users', payload)
    return API_CALL_RESULTS.SUCCESS
  },
  createIssue: async (description, status, severity, created, resolved, createdBy) => {
    let payload = {
      description, status, severity, created, resolved, createdBy
    }
    await axios.post(API_HOST + '/issues', payload)
    return API_CALL_RESULTS.SUCCESS
  },
  updateIssue: async (payload) => {
    let {id, ...rest} = payload
    await axios.put(`${API_HOST}/issues/${id}`, rest)
    return API_CALL_RESULTS.SUCCESS
  },
  getIssues: async (params) => {
    return await axios.get(API_HOST + '/issues', {params})
  },
  updateTopIssue: async (payload) => {
    return await axios.put(API_HOST + '/top-issues', payload)
  },
  getViewIssueCount: async () => {
    return await axios.get(API_HOST + '/top-issues')
  },
  findUserByEmail: async (email) => {
    return await axios.get(API_HOST + '/users', {params: {email: email ||''}})
  },
}