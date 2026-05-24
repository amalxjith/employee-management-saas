import API from "../../services/api";
import type { CreateEmployeePayload, UpdateEmployeePayload } from "./types";

export const fetchEmployeesRequest = async (page = 1, search = "") => {
  const response = await API.get(
    `/users?page=${page}&limit=5&search=${search}`,
  );
  return response.data;
};

export const deleteEmployeeRequest = async (id: string) => {
  const response = await API.delete(`/users/${id}`);

  return response.data;
};

export const createEmployeeRequest = async (data: CreateEmployeePayload) => {
  const response = await API.post("/users", data);

  return response.data;
};

export const updateEmployeeRequest = async (
  id: string,
  data: UpdateEmployeePayload,
) => {
  const response = await API.put(`/users/${id}`, data);

  return response.data;
};
