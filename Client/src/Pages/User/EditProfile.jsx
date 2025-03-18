import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getuserData, updateProfile } from "../../Redux/Slices/AuthSlice";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state?.auth?.data);

  const image = userData?.avatar?.secure_url;
  const fullName = userData?.fullName;

  const [data, setData] = useState({
    previewImage: image,
    fullName: fullName,
    avatar: undefined,
    userId: userData._id,
  });

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadedImage,
        });
      });
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    //    console.log(data)
    if (!data.fullName || !data.avatar) {
      toast.error("All fields are mandatory");
      return;
    }
    if (data.fullName.length < 5) {
      toast.error("Name cannot be of less than 5 characters");
      return;
    }

    const fromData = new FormData();
    fromData.append("fullName", data.fullName);
    fromData.append("avatar", data.avatar);

    await dispatch(updateProfile(fromData));

    await dispatch(getuserData());

    navigate("/user/profile");
  }
  return (
    <HomeLayout>
      <div className="flex h-[100vh] items-center justify-center">
        <form
          onSubmit={onFormSubmit}
          className="flex min-h-[26rem] w-80 flex-col items-center justify-center gap-5 rounded-lg p-4 text-white shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-semibold">Edit Profile</h1>
          <label className="cursor-pointer" htmlFor="image_uploads">
            {data.previewImage ? (
              <img
                className="m-auto h-28 w-28 rounded-full"
                src={data.previewImage}
              />
            ) : (
              <BsPersonCircle className="m-auto h-28 w-28 rounded-full" />
            )}
          </label>
          <input
            onChange={handleImageUpload}
            className="hidden"
            type="file"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .png, .svg,.jpeg"
          />

          <div className="flex w-full flex-col gap-1">
            <label htmlFor="fullName" className="font-semibold">
              {" "}
              Full Name
            </label>
            <input
              type="text"
              required
              name="fullName"
              id="fullName"
              placeholder="Enter your FullName...."
              className="border bg-transparent px-2 py-1"
              onChange={handleInputChange}
              value={data.fullName}
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full cursor-pointer rounded-sm bg-yellow-600 py-2 text-lg font-semibold transition-all duration-300 ease-in-out hover:bg-yellow-500"
          >
            Update Profile
          </button>
          <Link to="/user/profile">
            <p className="link flex w-full cursor-pointer items-center justify-center gap-3 text-accent">
              <AiOutlineArrowLeft />
              Go back to profile
            </p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}
export default EditProfile;
