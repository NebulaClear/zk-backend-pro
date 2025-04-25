export interface LoginParams {
  username: string;
  password: string;
  captcha?: string;
}

export interface UserInfo {
  id: number;
  name: string;
  avatar: string;
  roles: string[];
  department: string;
}
