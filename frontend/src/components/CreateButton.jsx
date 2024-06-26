import React from "react";
import Add from "../icons/Add";
import { useNavigate } from "react-router-dom";

const CreateButton = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/ask")}
      className="flex items-center gap-2 bg-red-700 rounded-md shadow-sm px-8 py-2 cursor-pointer"
    >
      <Add />
      <span className="text-white font-bold">Start a new Post</span>
    </div>
  );
};

export default CreateButton;
