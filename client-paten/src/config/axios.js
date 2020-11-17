import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4000',
})

// const instance = axios.create({
//   baseURL: 'https://shopmaker.herokuapp.com',
// })

// const instance = axios.create({
//   baseURL: 'https://shopmaker.shopmakerh8.xyz',
// })

export default instance
