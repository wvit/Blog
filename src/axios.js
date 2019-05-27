import axios from 'axios'
const production = false;
const url = production ? '132.232.114.236' : '10.100.115.103'

export default axios.create({
  baseURL: `http://${url}:1999`
});