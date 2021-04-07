import axios from 'axios';

const instance = axios.create({
    baseURL:'https://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        'x-token': localStorage.getItem('token'),
    }
})


export default instance;