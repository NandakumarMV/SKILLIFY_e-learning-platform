import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

const TutorHome = () => {
  const { tutorInfo } = useSelector((state) => state.tutorAuth);

  return (
    <div>
      <div className="relative mt-1">
        <img
          src="https://s.udemycdn.com/teaching/billboard-desktop-v4.jpg"
          alt="tutor-banner"
          className="w-full"
        />

        <div className="absolute top-1/2 left-32 transform -translate-y-1/2 text-white text-2xl">
          <h1 className="font-bold text-black font-mono">Teach with Us</h1>
          <p className="text-black text-base font-mono  whitespace-normal">
            Become an instructor and <br></br>change lives — including your own
          </p>
        </div>
      </div>

      <div className="h-auto md:h-96">
        <h3 className="text-3xl font-serif mt-10 text-center">
          So many reasons to start
        </h3>

        <div className="flex flex-col md:flex-row m-4 md:m-6 mt-6">
          <div className="text-center w-full md:w-1/3 mx-2 md:mx-6 mb-4 md:mb-0">
            <img
              src="https://s.udemycdn.com/teaching/value-prop-teach-v3.jpg"
              alt="banner2"
              className="mx-auto"
            />
            <div className="text-xl font-semibold">Teach your way</div>
            <div className="text-base">
              Publish the course you want, in the way you want, and always have
              control of your own content.
            </div>
          </div>

          <div className="text-center w-full md:w-1/3 mx-2 md:mx-6 mb-4 md:mb-0">
            <img
              src="https://s.udemycdn.com/teaching/value-prop-inspire-v3.jpg"
              alt="banner3"
              className="mx-auto"
            />
            <div className="text-xl font-semibold">Inspire learners</div>
            <div className="text-base">
              Teach what you know and help learners explore their interests,
              gain new skills, and advance their careers.
            </div>
          </div>

          <div className="text-center w-full md:w-1/3 mx-2 md:mx-6">
            <img
              src="https://s.udemycdn.com/teaching/value-prop-get-rewarded-v3.jpg"
              alt="banner4"
              className="mx-auto"
            />
            <div className="text-xl font-semibold">Get rewarded</div>
            <div className="text-base">
              Expand your professional network, build your expertise, and earn
              money on each paid enrollment.
            </div>
          </div>
        </div>
      </div>

      {tutorInfo && (
        <div className="h-auto md:h-60 bg-gray-200 flex flex-col justify-center items-center">
          <div className="text-lg font-serif leading-loose">Skillify</div>
          <div className="text-xl font-serif leading-loose">
            Welcome! {tutorInfo.name}
          </div>
          <div className="text-3xl font-serif leading-loose">
            Explore, Create, Grow with us
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorHome;
