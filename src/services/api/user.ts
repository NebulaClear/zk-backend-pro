import type { IResponseData } from '@/types/api';
import type { LoginParams, UserInfo } from '@/types/services/user';
import request from '@/utils/request';

export const UserService = {
  // 登录接口
  login: (params: LoginParams): Promise<IResponseData<{ token: string }>> =>
    request({
      url: '/api/user/login',
      method: 'POST',
      data: params,
    }),

  // 获取用户信息
  getUserInfo: (): Promise<IResponseData<UserInfo>> =>
    request({
      url: '/api/user/info',
      method: 'GET',
    }),

  // 更新用户信息
  updateUser: (params: Partial<UserInfo>): Promise<IResponseData<void>> =>
    request({
      url: '/api/user/update',
      method: 'PUT',
      data: params,
    }),
};
