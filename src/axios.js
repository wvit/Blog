import axios from 'axios'
const production = false;
const baseURL = production ? 'https://1wei.cc:1999' : 'http://10.100.115.109:1999'

export default axios.create({
  baseURL
});