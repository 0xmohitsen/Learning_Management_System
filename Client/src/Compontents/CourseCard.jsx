import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/course/description/", { state: { ...data } })}
      className="group h-[400px] w-[20rem] cursor-pointer overflow-hidden rounded text-white shadow-lg"
    >
      <div className="overflow-hidden">
        <img
          className="group-hover:scale=[1.2] h-48 w-full rounded-tl-lg rounded-tr-lg transition-all duration-300 ease-in-out"
          src={data?.thumbnail?.secure_url}
          alt="course thumbnail"
        />
        <div className="space-y-1 p-5 text-white">
          <h2 className="line-clamp-2 text-xl font-bold text-yellow-500">
            {data?.title}
          </h2>
          <p className="line-clamp-2">{data?.description}</p>
          <p className="font-semibold">
            <span className="font-bold text-yellow-500">Category :</span>
            {data?.category}
          </p>
          {/* <p className="font-semibold">
                        <span className="font-bold text-yellow-500">Total lectures :</span>
                        {data?.numberoflectures}
                    </p> */}
          <p className="font-semibold">
            <span className="font-bold text-yellow-500">Instructor :</span>
            {data?.createdBy}
          </p>
        </div>
      </div>
    </div>
  );
}
export default CourseCard;
