import request from '../request';
import type {
  UserListParams,
  UserItem,
  LoginParams,
  LoginResult
} from './types';

// 类型化的API请求方法
export const countryService = {
  // 获取国家列表
  getCountryList: async (params: UserListParams): Promise<any> => {
    return request.get('/countries', { params });
  },

  // 用户登录
  login: async (data: LoginParams): Promise<LoginResult> => {
    return request.post('/auth/login', { data });
  },

  // 获取用户详情
  getDetail: async (id: string): Promise<UserItem> => {
    return request.get(`/users/${id}`);
  },

  // 创建用户
  create: async (data: Partial<UserItem>) => {
    return request.post('/users', { data });
  },

  // 更新用户
  update: async (id: string, data: Partial<UserItem>) => {
    return request.patch(`/users/${id}`, { data });
  },

  // 删除用户
  delete: async (id: string) => {
    return request.delete(`/users/${id}`);
  }
};
