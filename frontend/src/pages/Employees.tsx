import { useEffect, useState, useOptimistic } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserPlus, MoreVertical } from "lucide-react";

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

  const [openMenuId, setOpenMenuId] =
  useState<string | null>(null);

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

        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <input
              placeholder="Search employee..."
              className="
                w-full
                md:w-80
                rounded-xl
                border
              border-gray-200
              bg-white
                px-4
                py-3
                text-sm
                outline-none
                focus:ring-2
              focus:ring-blue-500
              "
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="relative group">
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
                className="
      flex
      h-11
      w-11
      items-center
      justify-center
      rounded-full
      text-white
      shadow-sm
      transition
      hover:scale-105
      bg-slate-900
hover:bg-slate-800
    "
              >
                <UserPlus size={20} />
              </button>

              <div
                className="
      absolute
      right-0
      top-14
      whitespace-nowrap
      rounded-lg
      bg-gray-900
      px-3
      py-2
      text-xs
      text-white
      opacity-0
      transition
      group-hover:opacity-100
    "
              >
                Add Employee
              </div>
            </div>
          </div>

          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-gray-200
              bg-white
              shadow-sm
          "
          >
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Name
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Email
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Role
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Action
                  </th>
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
                    <tr
                      key={emp._id}
                      className="
                        transition
                        hover:bg-gray-100
                      "
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 capitalize">
                        {emp.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {emp.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        <span
                          className={`
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-medium
                            ${
                              emp.role === "admin"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-gray-100 text-gray-700"
                            }
                          `}
                        >
                          {emp.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 relative">

  <button
    onClick={() =>
      setOpenMenuId(
        openMenuId === emp._id
          ? null
          : emp._id
      )
    }
    className="
      rounded-lg
      p-2
      transition
      hover:bg-gray-100
    "
  >
    <MoreVertical size={18} />
  </button>

  {openMenuId === emp._id && (

    <div
      className="
        absolute
        right-6
        top-14
        z-10
        w-32
        overflow-hidden
        rounded-xl
        border
        border-gray-200
        bg-white
        shadow-lg
      "
    >

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

          setOpenMenuId(null);

        }}
        className="
          w-full
          px-4
          py-3
          text-left
          text-sm
          transition
          hover:bg-gray-50
        "
      >
        Edit
      </button>

      <button
        onClick={() => {

          handleDelete(emp._id);

          setOpenMenuId(null);

        }}
        className="
          w-full
          px-4
          py-3
          text-left
          text-sm
          text-red-600
          transition
          hover:bg-red-50
        "
      >
        Delete
      </button>

    </div>

  )}

</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
              className="
      rounded-lg
      border
      border-gray-200
      bg-white
      px-4
      py-2
      text-sm
      font-medium
      text-gray-600
      transition
      hover:bg-gray-100
      disabled:cursor-not-allowed
      disabled:opacity-50
    "
            >
              ← Prev
            </button>

            <div
              className="
      rounded-lg
      bg-gray-100
      px-4
      py-2
      text-sm
      font-medium
      text-gray-700
    "
            >
              Page {page} of {totalPages}
            </div>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages}
              className="
      rounded-lg
      border
      border-gray-200
      bg-white
      px-4
      py-2
      text-sm
      font-medium
      text-gray-600
      transition
      hover:bg-gray-100
      disabled:cursor-not-allowed
      disabled:opacity-50
    "
            >
              Next →
            </button>
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
