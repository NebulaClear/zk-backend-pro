import type { IResponseData } from '@/types/api';
import { message } from 'antd';
import axios, { AxiosError, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// 处理核心响应
const handleResponse = <T>(response: AxiosResponse<IResponseData<T>>) => {
  const resData = response.data;
  if (!resData.success) {
    return Promise.reject(resData);
  }
  return resData.data;
};

// 统一错误处理
const handleError = (error: AxiosError) => {
  if (error.response) {
    const status = error.response.status;
    const errorMap: { [key: number]: string } = {
      400: '请求参数错误',
      401: '身份验证失败',
      403: '没有操作权限',
      500: '服务器内部错误',
    };
    message.error(errorMap[status] || `请求错误 ${status}`);
  } else {
    message.error(error.message || '网络连接异常');
  }
  return Promise.reject(error);
};

// 请求拦截器
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 响应拦截器
instance.interceptors.response.use(
  (response) => handleResponse(response),
  (error: AxiosError) => handleError(error),
);

export default instance;
