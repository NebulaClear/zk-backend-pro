import { extend } from 'umi-request';
import { message } from 'antd';
import type { RequestOptionsInit } from 'umi-request';

// 环境配置
const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.yourdomain.com'
  : '/api';

// 创建实例
const request = extend({
  prefix: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  },
});

// 请求拦截器
request.interceptors.request.use((url, options: RequestOptionsInit) => {
  const token = localStorage.getItem('access_token');

  return {
    url,
    options: {
      ...options,
      headers: {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
      interceptors: true,
    },
  };
});

// 响应拦截器
request.interceptors.response.use(async (response) => {
  // const data = await response.clone().json();

  // 处理业务错误
  // if (data?.code !== 200) {
  //   message.error(data.message || '请求异常');
  //   return Promise.reject(data);
  // }

  return response;
});

// 统一错误处理
request.use(async (ctx, next) => {
  try {
    await next();
  } catch (error:any) {
    // 网络错误处理
    if (error.name === 'RequestError') {
      message.error('网络连接异常，请检查网络设置');
    }
    throw error;
  }
});

export default request;
