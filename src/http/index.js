/*
 * @Author: bluelife
 * @Date:   2020-09-01 23:51:12
 * @Last Modified by:   bluelife
 * @Last Modified time: 2020-09-02 00:12:05
 */

import axios from 'axios'

const http = axios.create({
  // baseURL: 'https://api.mcloudhub.com/merchant',
  baseURL: 'http://127.0.0.1:7001/merchant',
  timeout: 30000,
})

// Add a request interceptor
http.interceptors.request.use(function(config) {
  config.headers.devices = 'app-dian-dan-client'
  // Do something before request is sent
  // 判断设备是否支付localStorage缓存
  if (localStorage) {
    let token = localStorage.getItem('token'),
      uid = localStorage.getItem('uid')
    if (token) {
      config.headers.token = token
      config.headers.uid = uid
    }
  }
  return config;
}, function(error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
http.interceptors.response.use(function(response) {
  // 如果token不存在跳转到登陆页面
  if (response.data.code == 1001) {
    location.href = "/login"
  } else if (response.data.code == 1003) {
    // 登陆超过20天
    localStorage.setItem('tokenOver', true)
  } else {
    localStorage.setItem('tokenOver', false)
    return response;
  }
}, function(error) {
  var config = error.config;
  // If config does not exist or the retry option is not set, reject
  if (!config || !config.retry) return Promise.reject(error);

  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0;

  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retry) {
    // Reject with the error
    return Promise.reject(error);
  }

  // Increase the retry count
  config.__retryCount += 1;

  // Create new promise to handle exponential backoff
  var backoff = new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, config.retryDelay || 1);
  });

  // Return the promise in which recalls axios to retry the request
  return backoff.then(function() {
    return axios(config);
  });
});

export default http
