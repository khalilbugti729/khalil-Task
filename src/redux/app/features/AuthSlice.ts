import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  AuthResponseModel,
  LoginRequestModel,
  RegisterRequestModel,
} from '../../../model/AuthModel';
import {removeToken, setToken} from '../../../util/AuthToken';
import AuthService from '../../api/AuthService';

interface LoginState {
  token: string;
  isLoggedIn: boolean;
  userId: string;
}
const intialState: LoginState = {
  token: '',
  isLoggedIn: false,
  userId: '',
};

export const loginAsyncThunk = createAsyncThunk<
  AuthResponseModel,
  LoginRequestModel
>('user', async (loginData, thunkAPI) => {
  try {
    return await AuthService.loginApi(loginData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errResp = error.response?.data.desc;
      return thunkAPI.rejectWithValue(errResp);
    } else {
      return thunkAPI.rejectWithValue('Network Error');
    }
  }
});
export const registerAsyncThunk = createAsyncThunk<
  AuthResponseModel,
  RegisterRequestModel
>('getCategory', async (register, thunkAPI) => {
  try {
    console.log(register, 'khalil');
    const signUpResponse = await AuthService.registerUserApi(register);

    return signUpResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errResp = error.response?.data.desc;
      return thunkAPI.rejectWithValue(errResp);
      // Handle your error type safe here
    } else {
      // Handle the unknown
    }
  }
});

const authSlice = createSlice({
  name: 'user',
  initialState: intialState,
  reducers: {
    saveUser: (state, acton) => {
      state.isLoggedIn = true;
      state.token = acton.payload.token;
      state.userId = acton.payload.user.id;
    },
    deleteToken: state => {
      setToken('');
      removeToken();
      state.isLoggedIn = false;
    },
  },
});
export const {saveUser, deleteToken} = authSlice.actions;
export default authSlice.reducer;
