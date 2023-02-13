export interface CreateAndUpdateDriverRequestModel {
  token?: string;
  name: string;
  license_type?: string;
  age: number;
  license_expiry: string;
  phone: string;
  id?: string;
}

export interface DriverResponseModel {
  age: number;
  created_at: string;
  id: string;
  license_expiry: string;
  license_type: string;
  name: string;
  phone: string;
  updated_at: string;
  country?: string;
  gender: string;
}

export interface DeleteDriverRequestModel {
  token?: string;
  id?: string;
}
