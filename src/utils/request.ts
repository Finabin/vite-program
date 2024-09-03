import axios from "axios";
import { axiosResponse } from "../statics/index";
import Cookies from 'js-cookie';
import { process } from "../statics/axios";

const baseUrl = process.env.REACT_APP_API_URL;
const port = process.env.REACT_APP_PORT;

const axiosInstance = axios.create({
  baseURL: `${baseUrl}:${port}`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  }
})

const get = async (url: string, data?: any): Promise<axiosResponse> => {
  const res = await axiosInstance({
    url: url,
    method: 'GET',
    data: data,
  });
  return res.data as axiosResponse;
}

const post = async (url: string, data?: any): Promise<axiosResponse> => {
  const res = await axiosInstance({
    url: url,
    method: 'POST',
    data: data,
  });
  return res.data as axiosResponse
}

const request = {
  get,
  post
}

// 请求拦截器
axiosInstance.interceptors.request.use(function (config) {
  if (!config.url!.includes('/login')) {
    if (!Cookies.get('satoken')) {
      return Promise.reject('未登录');
    }
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 响应拦截器
axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default request;