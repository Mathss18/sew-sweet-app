import { AxiosResponse } from "axios";
import api from "./api.service";

export type LoginParams = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

export const authService = {
  login: (data: LoginParams) => api.post<unknown, AxiosResponse<LoginResponse>>("auth/login", data),
};
