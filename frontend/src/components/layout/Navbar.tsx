import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../app/store";
import { User, LogOut, ChevronDown } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex
    items-center
    justify-between
    border-b
    border-gray-200
    bg-white
    px-6
    py-4
">
      <h1 className="text-xl font-bold center">Dashboard</h1>

      <div className="relative">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="
      flex
      items-center
      gap-2
      rounded-full
      border
      border-gray-200
      bg-white
      px-3
      py-2
      transition
      hover:bg-gray-50
    "
        >
          <div
            className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-full
        bg-slate-900
        text-white
      "
          >
            <User size={18} />
          </div>

          <ChevronDown size={16} className="text-gray-500" />
        </button>

        {isProfileOpen && (
          <div
            className="
        absolute
        right-0
        top-14
        z-50
        w-44
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-xl
      "
          >
            <button
              className="
          flex
          w-full
          items-center
          gap-3
          px-4
          py-3
          text-sm
          text-gray-700
          transition
          hover:bg-gray-50
        "
            >
              <User size={16} />
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="
          flex
          w-full
          items-center
          gap-3
          px-4
          py-3
          text-sm
          text-red-600
          transition
          hover:bg-red-50
        "
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
