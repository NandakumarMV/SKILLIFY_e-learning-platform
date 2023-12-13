import React from "react";
import { BiSolidError } from "react-icons/bi";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center mt-10  ">
      <div className="drop-shadow-2xl mb-8 mt-12 w-[90%] sm:w-[95%] md:w-[80%] lg:w-[70%] flex flex-col justify-center items-center bg-gray-50 h-80">
        <div className="text-6xl sm:text-5xl md:text-6xl lg:text-4xl font-mono font-semibold">
          SKILLIFY
        </div>{" "}
        <div className="text-6xl sm:text-5xl md:text-6xl lg:text-[11rem] font-mono font-semibold transition-transform transform-gpu hover:scale-105 hover:text-red-500">
          404
        </div>
        <div className="text-base md:text-lg lg:text-xl font-bold pb-3">
          OOPS ! Something Went Wrong.
        </div>
        <div className="text-base md:text-lg lg:text-lg font-bold pb-3">
          Go to Home Page!
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
