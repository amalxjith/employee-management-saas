import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchEmployeesRequest,
  deleteEmployeeRequest,
  createEmployeeRequest,
  updateEmployeeRequest,
} from "./employeeApi";
import type { Employee, UpdateEmployeePayload } from "./types";

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  totalPages: number;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  totalPages: 1,
};

export const fetchEmployees = createAsyncThunk(
  "employees/fetch",
  async ({ page, search }: { page: number; search: string }) => {
    return await fetchEmployeesRequest(page, search);
  },
);

export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id: string) => {
    await deleteEmployeeRequest(id);
    return id;
  },
);

export const createEmployee = createAsyncThunk(
  "employees/create",
  async (data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    return await createEmployeeRequest(data);
  },
);

export const updateEmployee = createAsyncThunk(
  "employees/update",
  async ({
    id,
    data,
  }: {
    id: string;
    data: UpdateEmployeePayload;
  }) => {
    return await updateEmployeeRequest(id, data);
  },
);

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload.users;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (emp) => emp._id !== action.payload,
        );
      })
      .addCase(deleteEmployee.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.unshift(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.map((emp) =>
          emp._id === action.payload._id ? action.payload : emp,
        );
      });
  },
});

export default employeeSlice.reducer;
