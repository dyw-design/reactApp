import React from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';
import store from "../store";
import * as types from "../store/types";

axios.interceptors.request.use(function (config) {
    store.dispatch({type:types.VIEW_LOADING,payload:true});
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    store.dispatch({type:types.VIEW_LOADING,payload:false});
    return response;
}, function (error) {
    return Promise.reject(error);
});

React.Component.axios = axios;
window.axios = axios;
export default axios;