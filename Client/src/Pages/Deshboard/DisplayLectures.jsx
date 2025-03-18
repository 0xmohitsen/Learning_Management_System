import { useEffect, useState } from "react";
import { MdAutoDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import {
  deleteCourseLecture,
  getCourseLectures,
} from "../../Redux/Slices/LectureSlice";

function Displaylectures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(courseId, lectureId) {
    if (window.confirm("Are you Sure Want to delete the Lecture ?")) {
      await dispatch(
        deleteCourseLecture({ courseId: courseId, lectureId: lectureId })
      );
      await dispatch(getCourseLectures(courseId));
    }
  }
  useEffect(() => {
    if (!state) navigate("/course");
    dispatch(getCourseLectures(state._id));
  }, []);

  return (
    <HomeLayout>
      <div className="text-wihte mx-[5%] flex min-h-[90vh] flex-col items-center justify-center gap-10 py-10">
        <div className="text-center text-2xl font-semibold text-yellow-500">
          Course Name: {state?.title}
        </div>

        {lectures && lectures.length > 0 ? (
          <div className="flex w-full flex-col justify-center gap-10 md:flex-row">
            {/* left section for playing videos and displaying course details to admin */}
            <div className="space-y-5 rounded-lg p-2 shadow-[0_0_10px_black] md:h-[35rem] md:w-[28rem]">
              <video
                src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                className="max-h-96 rounded-tl-lg rounded-tr-lg object-fill"
                controls
                disablePictureInPicture
                muted
                controlsList="nodownload"
              ></video>
              <div>
                <h1>
                  <span className="text-yellow-500"> Title: </span>
                  {lectures && lectures[currentVideo]?.title}
                </h1>
                <p>
                  <span className="line-clamp-4 text-yellow-500">
                    Description:{" "}
                  </span>
                  {lectures && lectures[currentVideo]?.description}
                </p>
              </div>
            </div>

            {/* right section for displaying list of lectres */}
            <div className="space-y-4 rounded-lg p-2 shadow-[0_0_10px_black] md:h-[35rem] md:w-[28rem]">
              <div className="flex items-center justify-between text-xl font-semibold text-yellow-500">
                <p>Lectures list</p>

                {role === "ADMIN" && (
                  <button
                    onClick={() =>
                      navigate("/course/addlecture", { state: { ...state } })
                    }
                    className="btn btn-primary rounded-md px-2 py-1 text-sm font-semibold"
                  >
                    Add new lecture
                  </button>
                )}
              </div>
              <hr />
              <ul className="space-y-4 md:overflow-y-auto">
                {lectures &&
                  lectures.map((lecture, idx) => {
                    return (
                      <li
                        className="flex justify-between space-y-2"
                        key={lecture._id}
                      >
                        <p
                          className="mt-2 cursor-pointer text-white"
                          onClick={() => setCurrentVideo(idx)}
                        >
                          <span className="text-md"> Lecture {idx + 1} : </span>
                          {lecture?.title}
                        </p>
                        {role === "ADMIN" && (
                          <button
                            onClick={() =>
                              onLectureDelete(state?._id, lecture?._id)
                            }
                            className="relative bottom-[0.5] text-xl font-semibold"
                          >
                            <MdAutoDelete />
                          </button>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        ) : (
          role === "ADMIN" && (
            <button
              onClick={() =>
                navigate("/course/addlecture", { state: { ...state } })
              }
              className="btn btn-primary btn-active rounded-md px-4 py-2 text-lg font-semibold"
            >
              Add new lecture
            </button>
          )
        )}
      </div>
    </HomeLayout>
  );
}
export default Displaylectures;
