import React from "react";
import NothingImage from "../assets/nothing.png";

const NothingHere = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#1E212A] text-white h-screen">
      <img src={NothingImage} alt="Nothing Here" />
      <h1 className="text-xl mt-4">Nothing here!</h1>
    </div>
  );
};

export default NothingHere;
