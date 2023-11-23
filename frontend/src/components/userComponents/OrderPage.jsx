import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCourseMutation,
  useVerifyPaymentMutation,
} from "../../slices/userApiSlice";
import { setCourses } from "../../slices/courseDetailsSlice";
import axios from "axios";
import { createOrderUrl } from "../../url";

const OrderPage = () => {
  const { courseId } = useParams();
  const [verifypayment] = useVerifyPaymentMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const paymentVerification = async (
    response,
    courseId,
    price,
    userId,
    tutorId
  ) => {
    const result = await verifypayment({
      ...response,
      courseId,
      price,
      userId,
      tutorId,
    }).unwrap();
    if (result.success === true) {
      navigate("/my-learning");
    }
  };

  const confirmHandler = async (price, course, user) => {
    const { data } = await axios.post(
      createOrderUrl,
      { price },
      { withCredentials: true }
    );

    const options = {
      key: "rzp_test_bfnSH6XKHJdHG9",
      amount: price * 100,
      currency: "INR",
      name: "Skillify e-Learning",
      description: "Test Transaction",
      image: "",
      order_id: data.id,
      handler: (paymentResponse) =>
        paymentVerification(
          paymentResponse,
          course._id,
          price,
          user._id,
          course.tutorId.name
        ),
      prefill: {
        name: user.name,
        email: user.email,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const dispatch = useDispatch();
  const [getcourse] = useGetCourseMutation();

  const CourseData = async () => {
    const res = await getcourse(courseId).unwrap();
    dispatch(setCourses(res));
  };

  useEffect(() => {
    CourseData();
  }, []);

  const course = useSelector((state) => state.courses.courses.course);
  return (
    <div className="flex justify-around w-11/12 mt-10">
      {/* Purchase Courses Section */}

      <div className="flex flex-col items-center  w-[70%]">
        <div className="mt-10 text-2xl font-semibold text-blue-800  w-full ">
          Purchase Course
        </div>

        <div className="mt-4 flex p-4 border-y-2 border-gray-400 w-full">
          <div className="flex w-full justify-between">
            <div className="flex">
              <img
                src={course?.thumbnail}
                alt="course thumbnail"
                className="w-24 h-24"
              />
              <div className="px-4">
                <div className="text-lg text-green-600 font-semibold">
                  {course?.courseName}
                </div>
                <div className="text-base font-medium">
                  Course Domain: {course?.domain?.domainName}
                </div>
                <div className="text-base font-medium">
                  By: {course?.tutorId?.name.toUpperCase()}
                </div>
                <div className="text-base font-medium">
                  <p>
                    Created On: {new Date(course?.createdAt).toDateString()}
                  </p>
                </div>
              </div>{" "}
            </div>
            <div className="text-lg text-violet-600 font-medium mt-2  ">
              <p>Price: ₹ {course?.price}.00 </p>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="mt-24 flex flex-col bg-slate-50 p-6 w-1/2  ">
          <div className="text-xl font-semibold flex justify-center">
            Summary
          </div>
          <p className="text-lg font-bold text-blue-700 pt-4 flex justify-center">
            Total: ₹ {course?.price}.00
          </p>
          <button
            onClick={(e) => {
              confirmHandler(course?.price, course, userInfo);
            }}
            className="bg-violet-600 p-2 text-base text-white mt-3"
          >
            PURCHASE NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
