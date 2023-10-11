// import React from "react";
// import { RiLightbulbFlashLine } from "react-icons/ri";
// import { AiFillHeart } from "react-icons/ai";
// import { FaUserCircle } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const Header = () => {
//   return (
//     <header className="relative ">
//       <div className="bg-white-500 p-4 shadow-2xl  sticky top-0 ">
//         <div className="container mx-auto  ">
//           <div className="flex justify-between items-center p-1 ">
//             <div className="flex items-center space-x-.5">
//               <RiLightbulbFlashLine className="text-black text-2xl mb-2" />
//               <div className="text-black font-semibold text-xl pb-2">
//                 SKILLIFY
//               </div>
//             </div>
//             <ul className="flex space-x-10">
//               <li className="text-black hover:text-blue-600 cursor-pointer">
//                 <Link to="/courses">
//                   <a>Courses</a>
//                 </Link>
//               </li>
//               <li className="text-black hover:text-blue-600 cursor-pointer">
//                 <a href="">Teach with us</a>
//               </li>
//
//               <li>
//                 <button className="bg-black text-white  p-1 px-2 ml-1  hover:bg-white hover:text-black hover:border-2 hover:border-black">
//                   Log in
//                 </button>
//               </li>
//               <li>
//                 <button className="border-2 border-black text-black text-sm p-1 px-2 ml-1 hover:bg-black hover:text-white">
//                   Sign Up
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from "react";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { AiFillHeart } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="relative">
      <div className="bg-white-500 p-4 shadow-2xl sticky top-0">
        <div className="container mx-auto">
          <div className="flex justify-between items-center p-1">
            <div className="flex items-center space-x-.5">
              <RiLightbulbFlashLine className="text-black text-2xl mb-2" />
              <div className="text-black font-semibold text-xl pb-2">
                SKILLIFY
              </div>
            </div>
            <ul className="flex space-x-10">
              <li className="text-black hover:text-blue-600 cursor-pointer">
                <Link to="/courses">
                  <a>Courses</a>
                </Link>
              </li>
              <li className="text-black hover:text-blue-600 cursor-pointer">
                <a href="">Teach with us</a>
              </li>
              {/* <li className="text-black hover:text-blue-600 cursor-pointer">
//                 <a href="">My Courses</a>
//               </li>
//               <li className="text-black hover:text-blue-600 cursor-pointer">
//                 <a href="">
//                   <AiFillHeart className="h-9 w-6 pb-2" />
//                 </a>
//               </li>
//               <li className="text-black hover:text-blue-600 cursor-pointer">
//                 <a href="">
//                   <FaUserCircle className="h-9 w-6 pb-2" />
//                 </a>
//               </li> */}
              <li>
                <Link to="/">
                  <button className="border-2 border-black text-black text-sm p-1 px-2 ml-1 hover:bg-black hover:text-white">
                    Login
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <button className="border-2 border-black text-black text-sm p-1 px-2 ml-1 hover:bg-black hover:text-white">
                    Sign Up
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
