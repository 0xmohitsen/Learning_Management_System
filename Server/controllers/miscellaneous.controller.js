import asyncHandler from "../middlewares/asyncHAndler.middleware.js";
import User from "../models/usermodel.js";
import AppError from "../utils/error.util.js";
import sendEmail from "../utils/sendEmail.js";

/**
 * @CONTACT_US
 * Handles the submission of the "Contact Us" form by the user.
 * Sends an email to the admin with the user's details.
 */
export const contactUs = asyncHandler(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(new AppError("Name, Email, Message are required"));
  }

  try {
    const subject = "Contact Us Form";
    const textMessage = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 5px; border: 1px solid #ddd;">
      <h2 style="text-align: center; color: #333;">New Contact Us Submission</h2>
      <p style="font-size: 16px; color: #333;">
        <strong>Dear Admin,</strong><br />
        You have received a new message from a user through the "Contact Us" form.
      </p>
      <p style="font-size: 16px; color: #333; margin-bottom: 10px;">
        <strong>Name:</strong> ${name}
      </p>
      <p style="font-size: 16px; color: #333; margin-bottom: 10px;">
        <strong>Email:</strong> ${email}
      </p>
      <p style="font-size: 16px; color: #333; margin-bottom: 10px;">
        <strong>Message:</strong><br />
        <span style="font-style: italic;">${message}</span>
      </p>
      <p style="font-size: 14px; color: #555; text-align: center;">
        Best Regards,<br />
        The Support Team
      </p>
    </div>
`;

    await sendEmail(process.env.CONTACT_US_EMAIL, subject, textMessage);
  } catch (error) {
    console.log(error);
    return next(new AppError(error.message, 400));
  }

  res.status(200).json({
    success: true,
    message: "Your request has been submitted successfully",
  });
});
/**
 * @USER_STATS
 * Fetches the statistics of the users (total users and active subscribers).
 */
export const userStats = asyncHandler(async (req, res, next) => {
  const allUsersCount = await User.countDocuments();

  const subscribedUsersCount = await User.countDocuments({
    "subscription.status": "active", // subscription.status means we are going inside an object and we have to put this in quotes
  });

  res.status(200).json({
    success: true,
    message: "All registered users count",
    allUsersCount,
    subscribedUsersCount,
  });
});
