import { HttpRequestParams } from ".";
import api from "./api.service";

export const userService = {
  getAll: (params: HttpRequestParams) => api.get(`users`, { params }),
};