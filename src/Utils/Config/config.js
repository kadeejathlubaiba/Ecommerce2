import axios from 'axios';

const setAuthToken = (token) => {
    if(token){
        //allows you to set default header which will be sent with every request you make
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;
    }
    else{
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;