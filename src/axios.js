import axios from 'axios'
const production = true;
const url = production ? '132.232.114.236' : '10.100.115.106'

export default axios.create({
  baseURL: `http://${url}:1999`
});