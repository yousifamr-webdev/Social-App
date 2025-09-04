import React, { useContext, useEffect, useState } from "react";
import "./Profile.module.css";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { data } from "react-router-dom";
import UserPosts from "../UserPosts/UserPosts";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";
import UploadProfilePhoto from "../UploadProfilePhoto/UploadProfilePhoto";
import CreatePost from './../CreatePost/CreatePost';


export default function Profile() {

 async function getUserData() {
   return await axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
     headers: {
       token: localStorage.getItem("userToken"),
     },
   });
 }

 let { data, isError, isLoading, error } = useQuery({
   queryKey: ["getUserData"],
   queryFn: getUserData,
   select: (data)=>data?.data?.user,
 });


 

  return (
    <>
      <div className="card lg:card-side bg-base-100 shadow-sm sm:mx-auto mx-4 lg:w-3xl md:w-2xl sm:w-md my-4">
        <figure className="lg:h-56">
          <img src={data?.photo} alt={data?.name + "profile photo"} />
        </figure>
        <div className="card-body">
          <div className="flex gap-2">
            <dt className="font-semibold text-gray-900 w-24">User Name:</dt>
            <p className="text-gray-700">{data?.name}</p>
          </div>
          <div className="flex gap-2">
            <dt className="font-semibold text-gray-900 w-24">Gender:</dt>
            <p className="text-gray-700">{data?.gender}</p>
          </div>
          <div className="flex gap-2">
            <dt className="font-semibold text-gray-900 w-24">Email Address:</dt>
            <p className="text-gray-700">{data?.email}</p>
          </div>
          <div className="flex gap-2">
            <dt className="font-semibold text-gray-900 w-24">Birthday:</dt>
            <p className="text-gray-700">{data?.dateOfBirth}</p>
          </div>

          <div className="card-actions w-full mt-3">
            <UploadProfilePhoto />
            <ChangePasswordModal />
          </div>
        </div>
      </div>
      <CreatePost/>
      <UserPosts id={data?._id}></UserPosts>
    </>
  );
}
