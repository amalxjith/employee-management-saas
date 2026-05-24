export interface Employee {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface CreateEmployeePayload {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateEmployeePayload {
  name?: string;
  email?: string;
  role?: string;
}