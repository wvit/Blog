import axios from 'axios'
import {
  networkInterfaces
} from 'os';
const production = false;
let address = '';

for (let devName in networkInterfaces()) {
  interfaces[devName].forEach(item => {
    if (item.family === 'IPv4' && item.address !== '127.0.0.1') {
      address = item.address;
    }
  })
}
const url = production ? '132.232.114.236' : address

export default axios.create({
  baseURL: `http://${url}:1999`
});