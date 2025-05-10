// 分页响应格式
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 用户列表查询参数
export interface UserListParams {
  page?: number;
  pageSize?: number;
  name?: string;
  role?: string;
  status?: number;
}

// 用户详情类型
export interface UserItem {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 0 | 1;
  createdAt: string;
}

// 登录参数
export interface LoginParams {
  username: string;
  password: string;
}

// 登录响应
export interface LoginResult {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}
