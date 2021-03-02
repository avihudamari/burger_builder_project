import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://burger-builger-project.firebaseio.com/'
    baseURL: 'https://burger-builder-project-38203-default-rtdb.firebaseio.com/'
});

export default instance;