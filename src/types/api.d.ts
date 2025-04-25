// 基础响应结构
export interface IResponseData<T = any> {
  code: number;
  data: T;
  message?: string;
  success: boolean;
}
