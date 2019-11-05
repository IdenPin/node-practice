"use strict"

import Vue from "vue"
import router from "../router"
import axios from "axios"
import { Notification } from "element-ui"

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL:
    process.env.NODE_ENV === "production"
      ? "http://1orz.cn/HOK-Server/admin/api"
      : "http://0.0.0.0:3000/admin/api"
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function(config) {
    const tokenData = JSON.parse(localStorage.getItem("userData"))
    if (tokenData && tokenData.token) {
      config.headers.Authorization =
        "Bear " + (tokenData && tokenData.token) || ""
    }
    // Do something before request is sent
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response.data
  },
  function(error) {
    console.log("error.response", error.response)
    Notification({
      type: "error",
      title: "失败",
      message: error.response.data.message || error.response.statusText
    })
    if (error.response.status === 401) {
      router.push("/login")
    }
    return Promise.reject(error)
  }
)

// eslint-disable-next-line no-unused-vars
Plugin.install = function(Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      }
    },
    $axios: {
      get() {
        return _axios
      }
    },
    $http: {
      get() {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
