import { WeekendDays } from "../../../generated/prisma/enums";

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
  serviceAreas: string;
  weekendDays: WeekendDays;
  startTime: string;
  endTime: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export type IRegisterPayload =
  | ICustomerRegisterPayload
  | ITechnicianRegisterPayload;
