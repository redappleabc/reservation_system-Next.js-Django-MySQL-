"use client";

import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
      <PuffLoader size={100} color="red" />
    </div>
  );
};

export default Loader;
