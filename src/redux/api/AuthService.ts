import axios from 'axios';
import {LoginRequestModel, RegisterRequestModel} from '../../model/AuthModel';
import {BASE_URL} from '../../util/CONSTANTS';

const LOGIN_API_URL = `${BASE_URL}/login`;
const SIGNUP_API_URL = `${BASE_URL}/register`;

const loginApi = async (login: LoginRequestModel) => {
  const data = JSON.stringify({
    email: login.email,
    password: login.password,
  });
  const config = {
    method: 'post',
    url: LOGIN_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  const response = await axios(config);
  return response.data;
};

const registerUserApi = async (register: RegisterRequestModel) => {
  const data = JSON.stringify({
    email: register.email,
    name: register.name,
    password: register.password,
    password_confirmation: register.password,
  });

  const config = {
    method: 'post',
    url: SIGNUP_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  const response = await axios(config);
  return response.data;
};
const AuthService = {
  loginApi,
  registerUserApi,
};
export default AuthService;
