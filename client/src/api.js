import axios from 'axios'

let apiURL
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  apiURL = 'http://localhost:4000'
} else {
  apiURL = 'https://ajdeleon.xyz:4000'
}

const api = axios.create({
  baseURL: apiURL
})

export default api
