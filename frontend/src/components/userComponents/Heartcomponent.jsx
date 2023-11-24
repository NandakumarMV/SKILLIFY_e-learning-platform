import React, { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa6";
import {
  useAddWishlistMutation,
  useGetWishlistMutation,
  useDeleteFromWishlistMutation,
} from "../../slices/userApiSlice";
import axios from "axios";
import { getWishlistUrl } from "../../url";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist } from "../../slices/courseDetailsSlice";

const HeartComponent = ({ courseId }) => {
  const [addtowishlist] = useAddWishlistMutation();
  const [deleteFromWishlist] = useDeleteFromWishlistMutation();
  const [getAllWishlist] = useGetWishlistMutation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const getWishlist = async () => {
    const res = await getAllWishlist().unwrap();
    if (res) {
      dispatch(addWishlist(res));
    }
  };
  useEffect(() => {
    if (userInfo) {
      getWishlist();
    }
  }, [courseId]);

  const wishlistCourses = useSelector((state) => state.courses.wishlist);

  const isIncluded = wishlistCourses.some((item) => item.course === courseId);
  const handleToggleWishlist = async (e) => {
    e.preventDefault();
    if (!isIncluded) {
      const res = await addtowishlist({ courseId });
      dispatch(addWishlist(res.data));
      getWishlist();
    } else {
      const res = await deleteFromWishlist({ courseId });
      dispatch(addWishlist(res.data));
      getWishlist();
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleToggleWishlist}
        className={`text-2xl cursor-pointer ${
          isIncluded ? "text-black" : "text-gray-500"
        }`}
      >
        {isIncluded ? <FaHeart /> : <FiHeart />}
      </button>
    </div>
  );
};

export default HeartComponent;
