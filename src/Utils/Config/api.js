import axios from 'axios';
import serverData from './constant'
import setAuthToken from './config';
import { trackPromise} from 'react-promise-tracker';

const baseUrl =  serverData.BASEURL;
const config = {
    headers:{
        'Content-Type':'application/json'
    }
}
export const PostWithAuthToken = async (url, data) => {
    if(localStorage.getItem('token')){
        setAuthToken(localStorage.getItem('token'));
    } 
    try {
        console.log(baseUrl + url);
        const res = await trackPromise( axios.post(baseUrl + url, data,config));
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
}
