interface IBaseRegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface ICustomerRegisterPayload extends IBaseRegisterPayload {
  registeringAs: "CUSTOMER";
}

interface ITechnicianRegisterPayload extends IBaseRegisterPayload {
  registeringAs: "TECHNICIAN";
  bio?: string;
  profilePhoto?: string;
  experienceYears?: number;
  hourlyRate: number;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

enum WhereAbout {
  HOME,
  OFFICE,
}

export interface IAddress {
  address_line_1: string;
  address_line_2?: string;
  postCode: string;
  city: string;
  region: string;
  whereAbout?: WhereAbout;
}

export type IRegisterPayload =
  | ICustomerRegisterPayload
  | ITechnicianRegisterPayload;
