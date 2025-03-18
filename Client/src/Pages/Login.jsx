import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { login } from "../Redux/Slices/AuthSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setloginData({
      ...loginData,
      [name]: value,
    });
  }

  async function onLogin(event) {
    event.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the details ");
      return;
    }

    //dispatch create account action
    const response = await dispatch(login(loginData));
    if (response?.payload?.success) {
      navigate("/");
      setloginData({
        email: "",
        password: "",
      });
    }
  }
  return (
    <HomeLayout>
      <div className="flex h-[90vh] items-center justify-center">
        <form
          noValidate
          onSubmit={onLogin}
          className="flex w-80 flex-col justify-center gap-3 rounded-lg p-4 text-white shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Login Page</h1>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter your email...."
              className="border bg-transparent px-2 py-1"
              onChange={handleUserInput}
              value={loginData.email}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter your password...."
              className="border bg-transparent px-2 py-1"
              onChange={handleUserInput}
              value={loginData.password}
            />
          </div>

          <button
            type="submit"
            className="mt-2 cursor-pointer rounded-sm bg-yellow-600 py-2 text-lg font-semibold transition-all duration-300 ease-in-out hover:bg-yellow-500"
          >
            Login
          </button>

          <Link to={"/forget-password"}>
            <p className="link cursor-pointer text-center text-accent">
              Forget Password
            </p>
          </Link>

          <p className="text-center">
            Do not have an account?{" "}
            <Link to="/signup" className="link cursor-pointer text-accent">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}
export default Login;
