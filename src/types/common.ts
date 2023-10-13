export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export interface IService {
  name: string;
  price: number;
  description: string;
  availability: boolean;
  image_url: string;
}

type UserName = {
  firstName: string;
  lastName: string;
};

export enum UserRoles {
  USER = "user",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}

export type IUser = {
  name: UserName;
  email: string;
  mobileNumber: string;
};
