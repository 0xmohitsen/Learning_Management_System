import { useEffect } from "react";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import {
  getRazorPayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../Redux/Slices/RazorpaySlice.js";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  const subscription_id = useSelector(
    (state) => state?.razorpay?.subscription_id
  );
  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  async function handleSubscription(e) {
    e.preventDefault();
    if (!razorpayKey || !subscription_id) {
      toast.error("Something went wrong");
      return;
    }
    const options = {
      key: razorpayKey,
      subscription_id: subscription_id,
      name: "Coursify Pvt. Ltd.",
      description: "Subscription",
      theme: {
        color: "#F37258",
      },

      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;
        paymentDetails.razorpay_subscription_id =
          response.razorpay_subscription_id;

        toast.success("Payment successful");

        const res = await dispatch(verifyUserPayment(paymentDetails));
        // console.log(res);
        res?.payload?.success
          ? navigate("/checkout/success")
          : navigate("/checkout/fail");
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  async function load() {
    await dispatch(getRazorPayId());
    await dispatch(purchaseCourseBundle());
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <HomeLayout>
      <form
        onSubmit={handleSubscription}
        className="flex min-h-[90vh] items-center justify-center text-white"
      >
        <div className="relative flex h-[26rem] w-80 flex-col justify-center rounded-lg shadow-[0_0_10px_black]">
          <h1 className="rounded-tl0lg absolute top-0 w-full rounded-tr-lg bg-yellow-500 py-4 text-center text-2xl font-bold">
            Subscription Bundle
          </h1>
          <div className="space-y-5 px-4 text-center">
            <p className="text-[17px]">
              This purchase will allow you to access all available course of our
              platform for{" "}
              <span className="font-bold text-yellow-500">
                <br />1 Year duration
              </span>{" "}
              All the existing and new launched courses will be also available
            </p>

            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
              <BiRupee />
              <span>100</span> only
            </p>
            <div className="text-gray-200">
              <p>100% refund on cancellation</p>
              <p>* Terms and conditions applied *</p>
            </div>
            <button
              type="submit"
              className="absolute bottom-0 left-0 w-full rounded-bl-lg rounded-br-lg bg-yellow-500 py-2 text-xl font-bold transition-all duration-300 ease-in-out hover:bg-yellow-600"
            >
              Buy now
            </button>
          </div>
        </div>
      </form>
    </HomeLayout>
  );
}

export default Checkout;
