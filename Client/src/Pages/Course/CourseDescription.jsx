import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

function CourseDescripition() {
  const { state } = useLocation();
  console.log("state in course description :", state);
  const navigate = useNavigate();

  const { role, data } = useSelector((state) => state.auth);

  return (
    <HomeLayout>
      <div className="flex min-h-[90vh] flex-col items-center justify-center pt-12 text-white md:px-20">
        <div className="flex flex-col items-center justify-center md:w-[50rem] md:shadow-[0_0_10px_black]">
          <div className="mt-5">
            <h1 className="mb-2 text-center text-3xl font-bold text-yellow-500">
              {state?.title}
            </h1>
          </div>
          <div className="relative grid w-1/2 grid-cols-1 gap-5 py-10 md:w-[80%] md:grid-cols-2 md:gap-10">
            <div className="space-y-3">
              <img
                className="h-64 w-full"
                alt="thumbnail"
                src={state?.thumbnail?.secure_url}
              />
              <div className="space-y-1">
                <div className="flex flex-col items-center justify-center text-xl">
                  <p className="font-semibold">
                    <span>Total lectures : </span>
                    {state?.numberOfLectures}
                  </p>
                  <p className="font-semibold">
                    <span>Instructor : </span>
                    {state?.createdBy}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xl">
              <p className="text-yellow-500"> Course description: </p>
              <p className="lg:h-60">{state?.description}</p>
              {role === "ADMIN" || data?.subscription?.status === "active" ? (
                <button
                  onClick={() =>
                    navigate("/course/displaylecture", { state: { ...state } })
                  }
                  className="w-full rounded-md bg-yellow-600 px-5 py-3 text-xl font-bold transition-all duration-300 ease-in-out hover:bg-yellow-500"
                >
                  Watch lectures
                </button>
              ) : (
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full rounded-md bg-yellow-600 px-5 py-3 text-xl font-bold transition-all duration-300 ease-in-out hover:bg-yellow-500"
                >
                  Subscribe
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
export default CourseDescripition;
