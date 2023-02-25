import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-2 px-4">
      <div>
        <h1 className="text-3xl">Authentication App</h1>
      </div>
      <div className="flex gap-4">
        <Link
          to={"/signup"}
          className="border border-slate-500 px-4 py-2 bg-slate-300"
        >
          Signup
        </Link>
        <Link
          to={"/"}
          className="border border-slate-500 px-4 py-2 bg-slate-300"
        >
          Signin
        </Link>
        <Link
          to={"/userprofile"}
          className="border border-slate-500 px-4 py-2 bg-slate-300"
        >
          Profile
        </Link>
        <Link
          to={"/editprofile"}
          className="border border-slate-500 px-4 py-2 bg-slate-300"
        >
          Edit Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
