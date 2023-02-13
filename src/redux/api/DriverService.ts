import axios from 'axios';
import {
  CreateAndUpdateDriverRequestModel,
  DeleteDriverRequestModel,
} from '../../model/DriverModel';
import {BASE_URL} from '../../util/CONSTANTS';

const CREATE_DRIVER_API_URL = `${BASE_URL}/drivers/`;
const DELETE_DRIVER_API_URL = `${BASE_URL}/drivers/`;
const DETAIL_DRIVER_API_URL = `${BASE_URL}/drivers/`;

const createDriverApi = async (driver: CreateAndUpdateDriverRequestModel) => {
  const data = JSON.stringify({
    name: driver.name,
    license_type: driver.license_type,
    age: Number(driver.age),
    license_expiry: driver.license_expiry,
    phone: driver.phone,
  });
  console.log('driver', data);
  const config = {
    method: 'post',
    url: CREATE_DRIVER_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${driver.token}`,
    },
    data: data,
  };
  const response = await axios(config);
  return response.data;
};

const DriverApi = async (token: string) => {
  const config = {
    method: 'get',
    url: CREATE_DRIVER_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(config);
  return response.data;
};
const DeleteDriverApi = async (driver: DeleteDriverRequestModel) => {
  const config = {
    method: 'delete',
    url: DELETE_DRIVER_API_URL + driver.id,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${driver.token}`,
    },
  };
  const response = await axios(config);
  return response.data;
};

const DriverDetailApi = async (driver: DeleteDriverRequestModel) => {
  const config = {
    method: 'get',
    url: DETAIL_DRIVER_API_URL + driver.id,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${driver.token}`,
    },
  };
  const response = await axios(config);
  return response.data;
};

const EditDriverApi = async (driver: CreateAndUpdateDriverRequestModel) => {
  // const config = {
  //   method: 'put',
  //   url: DELETE_DRIVER_API_URL + driver.id,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${driver.token}`,
  //   },
  // };
  // const response = await axios(config);
  // return response.data;
  const data = JSON.stringify({
    name: driver.name,
    license_type: driver.license_type,
    age: Number(driver.age),
    license_expiry: driver.license_expiry,
    phone: driver.phone,
  });
  console.log('driver', data);
  const config = {
    method: 'put',
    url: DELETE_DRIVER_API_URL + driver.id,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${driver.token}`,
    },
    data: data,
  };
  const response = await axios(config);
  return response.data;
};
const DriverService = {
  createDriverApi,
  DriverApi,
  DeleteDriverApi,
  EditDriverApi,
  DriverDetailApi,
};
export default DriverService;
