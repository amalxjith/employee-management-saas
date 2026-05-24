import { useEffect, useState, useOptimistic } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchEmployees,
  deleteEmployee,
  createEmployee,
  updateEmployee,
} from "../features/employees/employeeSlice";

import type { AppDispatch, RootState } from "../app/store";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import type {
  CreateEmployeePayload,
  Employee,
  UpdateEmployeePayload,
} from "../features/employees/types";
import EmployeeModal from "../components/ui/EmployeeModal";

function Employees() {
  const dispatch = useDispatch<AppDispatch>();

  const { employees, totalPages } = useSelector(
    (state: RootState) => state.employees,
  );

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [optimisticEmployees, removeOptimistic] = useOptimistic(
    employees,
    (currentEmployees, id: string) =>
      currentEmployees.filter((emp) => emp._id !== id),
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    dispatch(
      fetchEmployees({
        page,
        search,
      }),
    );
  }, [dispatch, page, search]);

  const handleDelete = async (id: string) => {
    removeOptimistic(id);

    await dispatch(deleteEmployee(id));
  };

  const handleCreate = async (data: CreateEmployeePayload) => {
    await dispatch(createEmployee(data));
  };

  const handleEdit = async (data: UpdateEmployeePayload) => {
    if (!editingEmployee) return;

    await dispatch(
      updateEmployee({
        id: editingEmployee._id,
        data,
      }),
    );
  };

  const handleSubmitEmployee = async (
    data: CreateEmployeePayload | UpdateEmployeePayload,
  ) => {
    if (editingEmployee) {
      await handleEdit(data as UpdateEmployeePayload);
    } else {
      await handleCreate(data as CreateEmployeePayload);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-6">
          <input
            placeholder="Search employee"
            className="border p-2 mb-4 w-full"
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={() => {
              setEditingEmployee(null);
              setFormData({
                name: "",
                email: "",
                password: "",
                role: "user",
              });

              setIsModalOpen(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded mb-4"
          >
            Add Employee
          </button>

          <div className="bg-white rounded shadow">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {optimisticEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-gray-500">
                      No records found
                    </td>
                  </tr>
                ) : (
                  optimisticEmployees.map((emp: Employee) => (
                    <tr key={emp._id} className="border-b text-center">
                      <td>{emp.name}</td>
                      <td>{emp.email}</td>
                      <td>{emp.role}</td>
                      <td>
                        <button
                          onClick={() => {
                            setEditingEmployee(emp);
                            setFormData({
                              name: emp.name,
                              email: emp.email,
                              password: "",
                              role: emp.role,
                            });
                            setIsModalOpen(true);
                          }}
                          className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(emp._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employee={editingEmployee}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmitEmployee}
      />
    </div>
  );
}

export default Employees;
