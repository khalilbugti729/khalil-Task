export interface LoginRequestModel {
  email: string;
  password: string;
}

export interface RegisterRequestModel {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponseModel {
  token: string;
  user: UserModel;
}
export interface UserModel {
  created_at: string;
  email: string;
  id: string;
  name: string;
  updated_at: string;
  email_verified_at?: string;
}
