import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../app/store";

function Navbar() {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="bg-white shadow p-4 flex justify-between">
      <h1 className="text-xl font-bold">Dashboard</h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
