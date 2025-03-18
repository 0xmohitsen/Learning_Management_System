import crypto from "crypto";

import asyncHandler from "../middlewares/asyncHAndler.middleware.js";
import Payment from "../models/payment.model.js";
import User from "../models/usermodel.js";
import AppError from "../utils/error.util.js";
import { razorpay } from "../server.js";
import sendEmail from "../utils/sendEmail.js";

/**
 * @GET_RAZORPAY_ID
 * Returns the Razorpay API key for the client-side.
 */
export const getRaZorpayApikey = asyncHandler(async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Razarpay API key ",
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
});
/**
 * @ACTIVATE_SUBSCRIPTION
 * Handles the subscription process for the user by creating a new Razorpay subscription.
 */
export const buySubscription = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return next(new AppError("Unauthorize , please login"));
    }
    if (user.role === "ADMIN") {
      return next(new AppError(" Admin cannot purchase a subscription", 400));
    }
    if (user.subscription.id && user.subscription.status === "created") {
      await user.save();

      res.status(200).json({
        success: true,
        message: "subscribed successfully",
        subscription_id: user.subscription.id,
      });
    } else {
      const subscription = await razorpay.subscriptions.create({
        plan_id: process.env.RAZORPAY_PLAN_ID,
        customer_notify: 1,
        total_count: 12,
      });
      user.subscription.id = subscription.id;

      user.subscription.status = subscription.status;

      await user.save();
      console.log(user.subscription.id);
      res.status(200).json({
        success: true,
        message: "Subscribed Successfully ",
        subscription_id: subscription.id,
      });
    }
  } catch (error) {
    return next(new AppError(error.message, 500));
    console.log("What is the error :", error);
  }
});
/**
 * @VERIFY_SUBSCRIPTION
 * Verifies the payment for the subscription by validating the Razorpay payment signature.
 */
export const verifySubscription = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.user;
    const {
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return next(new AppError("Unauthorize , please login"));
    }

    const email = user.email;
    const subject = "Payment Successful!";

    const subscriptionId = user.subscription.id;

    const generateSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_payment_id}|${subscriptionId}`)
      .digest("hex");

    if (generateSignature !== razorpay_signature) {
      return next(createError(400, "payment not verified , please try again"));
    }

    await Payment.create({
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    });

    user.subscription.status = "active";

    await user.save();
    const textMessage = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 5px; border: 1px solid #ddd;">
      <h2 style="text-align: center; color: #28a745;">Payment Successful</h2>
      <p style="font-size: 16px; color: #333;">
        Dear ${user.fullName}, 
      </p>
      <p style="font-size: 16px; color: #333;">
        We are pleased to inform you that your payment for the <strong>LMS COURSE</strong> has been successfully processed. Thank you for your purchase.
      </p>
      <p style="font-size: 16px; color: #333;">
        <strong>Payment Details:</strong><br />
        <strong>Amount Paid:</strong> 100 <br />
        <strong>Transaction ID:</strong> ${razorpay_payment_id}<br />
        <strong>Subscription ID:</strong> ${razorpay_subscription_id}
      </p>
      <p style="font-size: 16px; color: #333;">
        Your subscription will begin immediately, and you can start enjoying the benefits right away.
      </p>
      <p style="font-size: 16px; color: #333;">
        If you have any questions or need assistance, feel free to contact our support team.
      </p>
      <p style="font-size: 16px; color: #333;">
        Thank you for choosing us!
      </p>
      <p style="font-size: 14px; color: #555; text-align: center;">
        Best Regards,<br />
        The Support Team
      </p>
    </div>
`;

    await sendEmail(email, subject, textMessage);
    res.status(200).json({
      success: true,
      message: "Payment verified Successfully ",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
});
/**
 * @CANCEL_SUBSCRIPTION
 * Cancels the user's subscription with Razorpay and updates the user's subscription status to inactive.
 */
export const cancelSubscription = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);
    if (!user) {
      return next(new AppError("Unauthorize , please login"));
    }
    if (user.role === "ADMIN") {
      return next(new AppError(" Admin cannot purchase a subscription", 400));
    }
    const email = user.email;
    const subject = "Your Subscription Has Been Cancelled";
    const subscriptionId = user.subscription.id;
    const subscription = await razorpay.subscriptions.cancel(subscriptionId);
    user.subscription.status = "Inactive";

    await user.save();
    const textMessage = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 5px; border: 1px solid #ddd;">
      <h2 style="text-align: center; color: #d9534f;">Subscription Cancelled</h2>
      <p style="font-size: 16px; color: #333;">
        Dear ${user.fullName}, 
      </p>
      <p style="font-size: 16px; color: #333;">
        We regret to inform you that your subscription has been successfully cancelled. You will continue to have access until the end of your current billing cycle.
      </p>
      <p style="font-size: 16px; color: #333;">
        <strong>Cancellation Details:</strong><br />
        <strong>Subscription ID:</strong> ${subscriptionId} <br />
      </p>
      <p style="font-size: 16px; color: #333;">
        If you have any questions or wish to reactivate your subscription, please contact our support team.
      </p>
      <p style="font-size: 16px; color: #333;">
        We appreciate your time with us and hope to serve you again in the future.
      </p>
      <p style="font-size: 14px; color: #555; text-align: center;">
        Best Regards,<br />
        The Support Team
      </p>
    </div>
`;

    await sendEmail(email, subject, textMessage);

    res.status(200).json({
      success: true,
      message: "UnSubscribed  Successfully ",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
});
/**
 * @GET_RAZORPAY_ID
 * Fetches and returns the payment records for all subscriptions, with monthly payment statistics.
 */
export const allPayments = asyncHandler(async (req, res, next) => {
  try {
    const { count, skip } = req.query;

    const allPayments = await razorpay.subscriptions.all({
      count: count ? count : 10, // If count is sent then use that else default to 10
      skip: skip ? skip : 0,
    });

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const finalMonths = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };

    const monthlyWisePayments = allPayments.items.map((payment) => {
      // We are using payment.start_at which is in unix time, so we are converting it to Human readable format using Date()
      const monthsInNumbers = new Date(payment.start_at * 1000);

      return monthNames[monthsInNumbers.getMonth()];
    });

    monthlyWisePayments.map((month) => {
      Object.keys(finalMonths).forEach((objMonth) => {
        if (month === objMonth) {
          finalMonths[month] += 1;
        }
      });
    });

    const monthlySalesRecord = [];

    Object.keys(finalMonths).forEach((monthName) => {
      monthlySalesRecord.push(finalMonths[monthName]);
    });

    res.status(200).json({
      success: true,
      message: "All payments",
      allPayments,
      finalMonths,
      monthlySalesRecord,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
});
