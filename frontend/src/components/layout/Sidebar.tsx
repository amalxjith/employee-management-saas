import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, LayoutDashboard, PanelLeftClose, PanelLeftOpen, Users } from "lucide-react";

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`
    relative
    min-h-screen
    bg-slate-900
    text-white
    transition-all
    duration-300
    ${isExpanded ? "w-64" : "w-20"}
  `}
    >
      <div
  className="
    flex
    items-center
    justify-between
    p-4
  "
>

  {isExpanded && (
    <h1
      className="
        text-lg
        font-semibold
      "
    >
      The SaaS
    </h1>
  )}

  <button
    onClick={() =>
      setIsExpanded(
        !isExpanded
      )
    }
    className="
      rounded-lg
      p-2
      transition
      hover:bg-slate-800
    "
  >

    {isExpanded ? (
      <PanelLeftClose size={20} />
    ) : (
      <PanelLeftOpen size={20} />
    )}

  </button>

</div>

<div className="mt-6 space-y-2">

  <button
  onClick={() => navigate("/dashboard")}
  className="
    flex
    w-full
    items-center
    gap-4
    rounded-xl
    px-4
    py-3
    transition
    hover:bg-slate-800
  "
>

  <LayoutDashboard size={20} />

  {isExpanded && (
    <span className="text-sm">
      Dashboard
    </span>
  )}

</button>

<button
  onClick={() => navigate("/employees")}
  className="
    flex
    w-full
    items-center
    gap-4
    rounded-xl
    px-4
    py-3
    transition
    hover:bg-slate-800
  "
>

  <Users size={20} />

  {isExpanded && (
    <span className="text-sm">
      Employees
    </span>
  )}

</button>

<button
  onClick={() => navigate("/reports")}
  className="
    flex
    w-full
    items-center
    gap-4
    rounded-xl
    px-4
    py-3
    transition
    hover:bg-slate-800
  "
>

  <BarChart3 size={20} />

  {isExpanded && (
    <span className="text-sm">
      Reports
    </span>
  )}

</button>

</div>

    </div>
  );
}

export default Sidebar;
