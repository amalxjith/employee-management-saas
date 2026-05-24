import React from "react";
import type {
  CreateEmployeePayload,
  Employee,
  UpdateEmployeePayload,
} from "../../features/employees/types";

interface FormDataType {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  employee?: Employee | null;
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  onSubmit: (data: CreateEmployeePayload | UpdateEmployeePayload) => void;
}

function EmployeeModal({
  isOpen,
  onClose,
  employee,
  formData,
  setFormData,
  onSubmit,
}: Props) {
  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(formData);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4">
          {employee ? "Edit Employee" : "Add Employee"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          {/* Password only for create */}
          {!employee && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />
          )}

          {/* Role */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              {employee ? "Update Employee" : "Create Employee"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded w-full"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeModal;
