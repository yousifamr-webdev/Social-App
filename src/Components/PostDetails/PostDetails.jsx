import React from "react";
import "./PostDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Comment from "../Comment/Comment";
import CreateCommentModal from "../CreateCommentModal/CreateCommentModal";
import UpdatePost from "../UpdatePost/UpdatePost";
import DeletePost from './../DeletePost/DeletePost';
import dayjs from "dayjs";


export default function PostDetails() {
  let { id } = useParams();
  function getSinglePost() {
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: { token: localStorage.getItem("userToken") },
    });
  }
   const userId = localStorage.getItem("userId");

  let { data, isError, isLoading, error } = useQuery({
    queryKey: ["getSinglePost"],
    queryFn: getSinglePost,
    select: (data) => data.data.post,
  });

  if (isError) {
    return (
      <>
        <div role="alert" className="alert alert-error alert-soft flex justify-center items-center mx-auto">
          <span>{error}</span>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <div className="flex lg:w-3xl md:w-2xl sm:w-md flex-col gap-4  items-center justify-center align-middle sm:mx-auto mx-4">
          <div className="flex items-center gap-4 lg:w-3xl md:w-2xl sm:w-md w-full ">
            <div className="skeleton  size-16 shrink-0 rounded-full"></div>
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

  return (
    <>
      <div className="flex justify-center sm:mx-auto mx-4">
        <div className="card bg-base-200 lg:w-3xl md:w-2xl sm:w-md shadow-sm my-6">
          <div className="card-body">
            <div className="flex items-center">
              <div className="avatar">
                <div className="ring-neutral ring-offset-base-100 size-12 rounded-full ring-2 ring-offset-2 me-3">
                  <img src={data?.user.photo} />
                </div>
              </div>

              <div className="flex justify-between w-full">
                <div>
                  <h2>{data?.user.name}</h2>
                  <span className="text-gray-500 text-[12px]">
                    {dayjs(data?.createdAt).format("DD/MM/YYYY h:mm A")}
                  </span>
                </div>
                {data?.user._id === userId && (
                  <div className="dropdown dropdown-end">
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
                        <DeletePost postId={data?.id} />
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <p className="w-full">{data?.body}</p>
          </div>
          <figure>
            <img src={data?.image} alt={data?.body} />
          </figure>

          <div className="join">
            <button className="btn w-1/3 inline-flex items-center justify-center gap-2">
              <i className="fa-solid fa-thumbs-up text-lg leading-none"></i>
              <span>Like</span>
            </button>

            <CreateCommentModal postId={data?.id} />

            <button className="btn w-1/3 inline-flex items-center justify-center gap-2">
              <i className="fa-solid fa-share text-lg leading-none"></i>
              <span>Share</span>
            </button>
          </div>
          {data?.comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
      <input type="checkbox" id="editPostModal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <UpdatePost postId={data?.id} />
        </div>
      </div>
    </>
  );
}
