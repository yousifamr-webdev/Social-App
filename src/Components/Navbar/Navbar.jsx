import React, { useContext } from "react";
import "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import siteLogo from "../../assets/socialApp_logo.png"

export default function Navbar() {
  let { userLogin, setuserLogin } = useContext(UserContext);
let navigate = useNavigate()
  function signOut() {
    localStorage.removeItem("userToken");
     localStorage.removeItem("userId");
    setuserLogin(null)
    navigate("/login")
}

  
 async function getUserData() {
   return await axios.get(
     `https://linked-posts.routemisr.com/users/profile-data`,
     {
       headers: {
         token: localStorage.getItem("userToken"),
       },
     }
   );
 }

 let { data, isError, isLoading, error } = useQuery({
   queryKey: ["getUserData"],
   queryFn: getUserData,
   select: (data) => data?.data?.user,
 });
  
  

  return (
    <>
      <div className="navbar bg-neutral text-neutral-content shadow-sm px-16">
        <div className="flex-1">
          <Link to="/" className="text-xl">
           
            <span>Social App</span>
          </Link>
        </div>
        <div className="flex gap-4">
          {userLogin !== null ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img src={data?.photo} alt={data?.name + "profile photo"} />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content  bg-neutral/80 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <div className="flex gap-2 flex-col p-2">
                    <h2 className="font-semibold w-24">{data?.name}</h2>
                    <p className="italic">{data?.email}</p>
                  </div>
                  <div className="divider before:bg-gray-400  after:bg-gray-400 w-full mx-auto -my-0.5 px-2"></div>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <span onClick={signOut}>Sign out</span>
                  </li>
                </ul>
              </div>
            </>
          ) : (
          <></>
          )}
        </div>
      </div>
    </>
  );
}
