export interface IRegisterUserPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: IAddress;
}

export interface IAddress {
  address_line_1: string;
  address_line_2?: string;
  postCode: string;
  city: string;
  region: string;
}
