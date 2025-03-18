import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourse, getAllCourse } from "../../Redux/Slices/CourseSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

function AdminDeshboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsersCount, subscribedCount } = useSelector((state) => state.stat);

  const { allPayments, monthlySalesRecord } = useSelector(
    (state) => state.razorpay
  );

  const userData = {
    labels: ["Registered User", "Enrolled User"],
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount, subscribedCount],
        backgroundColor: ["yellow", "green"],
        borderWidth: 1,
        borderColor: ["yellow", "green"],
      },
    ],
  };

  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    fontColor: "white",
    datasets: [
      {
        label: "Sales/Month",
        data: monthlySalesRecord,
        backgroundColor: ["red"],
      },
    ],
  };

  const myCourse = useSelector((state) => state?.course?.courseData);

  async function onCourseDelete(id) {
    if (window.confirm("Are you Sure Want to delete the course ?")) {
      const res = await dispatch(deleteCourse(id));
      if (res?.paylaod?.success) {
        await dispatch(getAllCourse());
      }
    }
  }

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourse());
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, []);

  return (
    <HomeLayout>
      <div className="flex min-h-[90vh] flex-col flex-wrap gap-10 pt-5 text-white">
        <h1 className="text-center text-3xl font-semibold text-yellow-500 sm:text-5xl">
          Admin Dashboard
        </h1>

        <div className="m-auto grid gap-5 md:mx-10 md:grid-cols-2">
          <div className="flex flex-col items-center gap-10 rounded-md p-5 shadow-lg">
            <div className="h-80 w-80">
              <Pie data={userData} />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex items-center justify-between gap-5 rounded-md p-5 shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Registered Users</p>
                  <h3 className="text-4xl font-bold">{allUsersCount}</h3>
                </div>
                <FaUsers className="text-5xl text-yellow-500" />
              </div>
              <div className="flex items-center justify-between gap-5 rounded-md p-5 shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscribed Users</p>
                  <h3 className="text-4xl font-bold">{subscribedCount}</h3>
                </div>
                <FaUsers className="text-5xl text-green-500" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-10 rounded-md p-5 shadow-lg">
            <div className="relative h-80 w-full">
              <Bar className="absolute bottom-0 h-80 w-full" data={salesData} />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex items-center justify-between gap-5 rounded-md p-5 shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscription Count</p>
                  <h3 className="text-4xl font-bold">{allPayments?.count}</h3>
                </div>
                <FcSalesPerformance className="text-5xl text-yellow-500" />
              </div>
              <div className="flex items-center justify-between gap-5 rounded-md p-5 shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Total Revenue</p>
                  <h3 className="text-4xl font-bold">
                    {allPayments?.count * 499}
                  </h3>
                </div>
                <GiMoneyStack className="text-5xl text-green-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10 flex w-[80%] flex-col items-center justify-center gap-10 self-center lg:mx-[10%]">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-center text-2xl font-semibold sm:text-3xl">
              Courses overview
            </h1>
            <button
              onClick={() => {
                navigate("/course/create");
              }}
              className="w-fit cursor-pointer rounded bg-yellow-500 px-2 py-2 font-semibold transition-all duration-300 ease-in-out hover:bg-yellow-600 sm:px-4 sm:text-lg"
            >
              Create new course
            </button>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>S No</th>
                  <th>Course Title</th>
                  <th>Course Category</th>
                  <th>Instructor</th>
                  <th>Total Lectures</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myCourse?.map((course, idx) => {
                  return (
                    <tr key={course._id}>
                      <td>{idx + 1}</td>
                      <td>
                        <textarea
                          readOnly
                          value={course?.title}
                          className="h-auto w-full resize-none bg-transparent lg:w-40"
                        ></textarea>
                      </td>
                      <td>{course?.category}</td>
                      <td>{course?.createdBy}</td>
                      <td>{course?.numberOfLectures}</td>
                      <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                        <textarea
                          value={course?.description}
                          readOnly
                          className="h-auto w-full resize-none bg-transparent lg:w-80"
                        ></textarea>
                      </td>
                      <td className="flex items-center gap-4">
                        <button
                          className="rounded-md bg-green-500 px-3 py-2 text-xl font-bold transition-all duration-300 ease-in-out hover:bg-green-600"
                          onClick={() =>
                            navigate("/course/displaylecture", {
                              state: { ...course },
                            })
                          }
                        >
                          <BsCollectionPlayFill />
                        </button>

                        <button
                          className="rounded-md bg-yellow-500 px-3 py-2 text-xl font-bold transition-all duration-300 ease-in-out hover:bg-yellow-600"
                          onClick={() =>
                            navigate("/course/edit", {
                              state: {
                                ...course,
                              },
                            })
                          }
                        >
                          <TiEdit />
                        </button>

                        <button
                          className="rounded-md bg-red-500 px-3 py-2 text-xl font-bold transition-all duration-300 ease-in-out hover:bg-red-600"
                          onClick={() => onCourseDelete(course?._id)}
                        >
                          <BsTrash />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
export default AdminDeshboard;
