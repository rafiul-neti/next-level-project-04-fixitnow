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
