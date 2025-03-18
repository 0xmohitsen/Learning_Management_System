import { useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getuserData } from "../../Redux/Slices/AuthSlice";

function CheckoutSuccess() {
  const dispatch = useDispatch();

  async function getData() {
    await dispatch(getuserData());
  }
  useEffect(() => {
    getData();
  });
  return (
    <HomeLayout>
      <div className="flex min-h-[90vh] items-center justify-center text-white">
        <div className="relative flex h-[26rem] w-80 flex-col items-center justify-center rounded-lg shadow-[0_0_10px_black]">
          <h1 className="absolute top-0 w-full rounded-tl-lg rounded-tr-lg bg-green-500 py-4 text-center text-2xl font-bold">
            Payment Successful
          </h1>

          <div className="flex flex-col items-center justify-center space-y-2 px-4">
            <div className="space-y-2 text-center">
              <h2 className="text-lg font-semibold">
                Welcome to the pro bundle
              </h2>
              <p className="text-left">Now you can enjoy all the courses.</p>
            </div>
            <AiFillCheckCircle className="text-5xl text-green-500" />
          </div>

          <Link
            to="/"
            className="absolute bottom-0 w-full rounded-bl-lg rounded-br-lg bg-green-500 py-2 text-center text-xl font-semibold transition-all duration-300 ease-in-out hover:bg-green-600"
          >
            <button>Go to dashboard</button>
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
}
export default CheckoutSuccess;
