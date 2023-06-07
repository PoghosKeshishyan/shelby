import axios from 'axios';

export default axios.create({
    baseURL: 'https://shelbybackend1.herokuapp.com/api/'
});
