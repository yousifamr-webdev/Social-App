import React, { useContext, useEffect, useState } from "react";
import "./Home.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Comment from "../Comment/Comment";
import { Link } from "react-router-dom";
import CreateCommentModal from "../CreateCommentModal/CreateCommentModal";
import UpdatePost from "../UpdatePost/UpdatePost";
import DeletePost from "../DeletePost/DeletePost";
import dayjs from "dayjs";
import CreatePost from "../CreatePost/CreatePost";

export default function Home() {
  function getAllPosts() {
    return axios.get(`https://linked-posts.routemisr.com/posts?limit=50`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data, isError, isLoading, error } = useQuery({
    queryKey: ["getAllPosts"],
    queryFn: getAllPosts,
    select: (data) => data?.data?.posts,
    staleTime: 30000,
    refetchInterval: 60000,
    refetchOnWindowFocus: true,
  });

  if (isError) {
    return (
      <>
        <div role="alert" className="alert alert-error alert-soft">
          <span>{error}</span>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <div className="flex lg:w-3xl md:w-2xl w-md flex-col gap-4  items-center justify-center align-middle mx-auto">
          <div className="flex items-center gap-4 lg:w-3xl md:w-2xl w-md">
            <div className="skeleton size-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-20"></div>
            </div>
          </div>
          <div className="skeleton h-72 w-full"></div>
        </div>
      </>
    );
  }

  const userId = localStorage.getItem("userId");

  return (
    <>
      <CreatePost />

      {data?.map((post) => (
        <div className="flex justify-center mx-auto" key={post.id}>
          <div className="card bg-base-200 lg:w-3xl md:w-2xl w-md shadow-sm my-6 relative">
            <Link to={`/postdetails/${post.id}`}>
              <div className="card-body">
                <div className="flex items-center">
                  <div className="avatar">
                    <div className="ring-neutral ring-offset-base-100 size-12 rounded-full ring-2 ring-offset-2 me-3">
                      <img src={post.user.photo} />
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <div>
                      <h2>{post.user.name}</h2>
                      <span className="text-gray-500 text-[12px]">
                        {dayjs(post.createdAt).format("DD/MM/YYYY h:mm A")}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="w-full">{post.body}</p>
              </div>
              <figure>
                <img src={post.image} alt={post.body} />
              </figure>
            </Link>
            {post?.user._id === userId && (
              <div className="dropdown dropdown-start absolute top-7 end-7">
                <i
                  tabIndex={0}
                  role="button"
                  className="fa-solid fa-ellipsis fa-xl hover:text-gray-500 focus:text-gray-500"
                ></i>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-30  p-2 shadow-sm"
                >
                  <li>
                    <label htmlFor="editPostModal" role="button">
                      Edit
                    </label>
                  </li>
                  <li>
                    <DeletePost postId={post?.id} />
                  </li>
                </ul>
              </div>
            )}
            <div className="join">
              <button className="btn w-1/3 inline-flex items-center justify-center gap-2">
                <i className="fa-solid fa-thumbs-up text-lg leading-none"></i>
                <span>Like</span>
              </button>

              <CreateCommentModal postId={post?.id} />

              <button className="btn w-1/3 inline-flex items-center justify-center gap-2">
                <i className="fa-solid fa-share text-lg leading-none"></i>
                <span>Share</span>
              </button>
            </div>

            <Comment comment={post.comments[0]} />
          </div>
          <input type="checkbox" id="editPostModal" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box">
              <UpdatePost postId={post?.id} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
