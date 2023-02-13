import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  CreateAndUpdateDriverRequestModel,
  DeleteDriverRequestModel,
  DriverResponseModel,
} from '../../../model/DriverModel';

import DriverService from '../../api/DriverService';

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

export const CreateDriverAsyncThunk = createAsyncThunk<
  DriverResponseModel,
  CreateAndUpdateDriverRequestModel
>('user', async (driver, thunkAPI) => {
  try {
    return await DriverService.createDriverApi(driver);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errResp = error.response?.data.desc;
      return thunkAPI.rejectWithValue(errResp);
    } else {
      return thunkAPI.rejectWithValue('Network Error');
    }
  }
});
export const DeleteDriverAsyncThunk = createAsyncThunk<
  DriverResponseModel,
  DeleteDriverRequestModel
>('user', async (driver, thunkAPI) => {
  try {
    return await DriverService.DeleteDriverApi(driver);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errResp = error.response?.data.desc;
      return thunkAPI.rejectWithValue(errResp);
    } else {
      return thunkAPI.rejectWithValue('Network Error');
    }
  }
});
export const EditDriverAsyncThunk = createAsyncThunk<
  DriverResponseModel,
  CreateAndUpdateDriverRequestModel
>('user', async (driver, thunkAPI) => {
  try {
    return await DriverService.EditDriverApi(driver);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errResp = error.response?.data.desc;
      return thunkAPI.rejectWithValue(errResp);
    } else {
      return thunkAPI.rejectWithValue('Network Error');
    }
  }
});

export const DriverAsyncThunk = createAsyncThunk<
  DriverResponseModel[],
  {token: string}
>('user', async ({token}, thunkAPI) => {
  try {
    return await DriverService.DriverApi(token);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errResp = error.response?.data.desc;
      return thunkAPI.rejectWithValue(errResp);
    } else {
      return thunkAPI.rejectWithValue('Network Error');
    }
  }
});

export const DriverDetailAsyncThunk = createAsyncThunk<
  DriverResponseModel,
  DeleteDriverRequestModel
>('user', async (driver, thunkAPI) => {
  try {
    return await DriverService.DriverDetailApi(driver);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errResp = error.response?.data.desc;
      return thunkAPI.rejectWithValue(errResp);
    } else {
      return thunkAPI.rejectWithValue('Network Error');
    }
  }
});

const driverSlice = createSlice({
  name: 'user',
  initialState: intialState,
  reducers: {
    saveUser: (state, acton) => {
      state.isLoggedIn = true;
      state.token = acton.payload.token;
      state.userId = acton.payload.userId;
    },
    // deleteToken: state => {
    //   setToken('');
    //   removeToken();
    //   state.isLoggedIn = false;
    // },
  },
});
export const {saveUser} = driverSlice.actions;
export default driverSlice.reducer;
