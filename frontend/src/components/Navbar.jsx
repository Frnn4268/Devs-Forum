import React from "react";
import { useNavigate } from "react-router-dom";
import Hamburger from "../icons/Hamburger";
import Cancel from "../icons/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../context/sidebarSlice";
import Logout from "../icons/Logout";

const Navbar = () => {
  const open = useSelector((state) => state.sidebar.open);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  return (
    <div
      className="fixed bg-white dark:bg-[#1E212A]
     top-0 left-0 right-0 z-10 h-14  shadow-md  flex items-center justify-between
     px-4
     md:px-20"
    >
      <div className="text-sm md:text-base font-bold text-red-500 cursor-pointer flex items-center gap-4">
        <div
          onClick={() => dispatch(toggle())}
          className="
          transition-transform   ease-linear
        duration-700 cursor-pointer
        "
        >
          {!open ? <Hamburger /> : <Cancel />}
        </div>
        Dev's - Forum
      </div>

      <div className="flex items-center gap-3">
        <Logout />
        <div className="hidden md:flex items-center gap-5">
          <div
            className="cursor-pointer text-sm 
          md:text-base dark:text-white font-bold"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            Logout
          </div>
          <img
            src={
              user?.profileImage ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFY677t7F_8Epm50xo5OfqI882l5OBOPKRDxDWeGo7OQ&s"
            }
            alt="profile"
            className="
          w-6 h-6
          md:w-7 md:h-7 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
