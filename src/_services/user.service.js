import axios from 'axios';
import config from '../config/config';


export const userService = {
    post,
    put,
    get,
    deleteDetail
};

function get(apiEndpoint,download){
    return axios.get(config.baseUrl+apiEndpoint, getOptions(download)).then((response)=>{
        return response;
    })
}

function post(apiEndpoint, payload){
    return axios.post(config.baseUrl+apiEndpoint, payload, getOptions());
}

function put(apiEndpoint, payload){
    return axios.put(config.baseUrl+apiEndpoint, payload, getOptions());
}

function deleteDetail(apiEndpoint){
    return axios.delete(config.baseUrl+apiEndpoint, getOptions());
}

function getOptions(download){
    let options = {};
    if(localStorage.getItem('token')){
        options.headers = { 'x-access-token': localStorage.getItem('token') };
    }
    options.responseType=download?'blob':download;
    return options;
}