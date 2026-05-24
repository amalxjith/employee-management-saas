import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import type { AppDispatch, RootState } from "../app/store";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(
      registerUser({
        name,
        email,
        password,
      }),
    );

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Register</h2>

        <input
          placeholder="Name"
          className="w-full border p-3 mb-4 rounded"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-600 text-white p-3 rounded">
          Register
        </button>

        <p className="mt-4 text-center">
          Already have account?{" "}
          <Link to="/" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
