import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../../Compontents/CourseCard";
import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourse } from "../../Redux/Slices/CourseSlice";

function CourseList() {
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);

  async function loadCourses() {
    await dispatch(getAllCourse());
  }
  useEffect(() => {
    loadCourses();
  }, []);
  return (
    <HomeLayout>
      <div className="flex min-h-[90vh] flex-col gap-10 pt-12 text-white">
        <h1 className="text-center text-3xl font-semibold">
          Explore the course made by
          <span className="font-bold text-yellow-500">Industry experts</span>
        </h1>
        <div className="mx-auto mb-10 grid grid-cols-1 gap-16 text-center md:grid-cols-2 xl:grid-cols-3">
          {courseData?.map((element) => (
            <CourseCard key={element._id} data={element} />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}
export default CourseList;
