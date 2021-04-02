import axios from "axios";

export const API_HOST = 'http::/localhost:3001'
export const API_CALL_RESULTS = {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
}

export const APIs = {
  createUser: async (firstName, lastName, email, password, location, contactNo) => {
    let payload = {
      firstName, lastName, email, password, location, contactNo
    }
    await axios.post('/users', payload)
    return API_CALL_RESULTS.SUCCESS
  },
  createIssue: async (description, status, severity, createdBy) => {
    let payload = {
      description, status, severity, createdBy
    }
    await axios.post('/issues', payload)
    return API_CALL_RESULTS.SUCCESS
  },
  updateIssue: async (payload) => {
    let {id, ...rest} = payload
    await axios.put('/issue/' + id, rest)
    return API_CALL_RESULTS.SUCCESS
  },
  getIssues: async (params) => {
    return await axios.get('/issues', {params})
  },
  findUserByEmail: async (email) => {
    return await axios.post('/users?email', email)
  },
}