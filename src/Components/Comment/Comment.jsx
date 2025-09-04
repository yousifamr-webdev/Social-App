import React from "react";
import "./Comment.module.css";
import DeleteComment from "../DeleteComment/DeleteComment";
import UpdateComment from "../UpdateComment/UpdateComment";
import dayjs from "dayjs";

export default function Comment({ comment }) {
  if (!comment) return null;
  let { commentCreator, content, createdAt, _id } = comment;
  const userId = localStorage.getItem("userId");

  return (
    <>
      <div className="p-8 bg-base-300">
        <div className="flex items-center">
          <div className="avatar">
            <div className="ring-neutral ring-offset-base-100 size-12 rounded-full ring-2 ring-offset-2 me-3">
              <img src={commentCreator?.photo} />
            </div>
          </div>

          <div className="flex justify-between w-full">
            <div>
              <h2 className="-mb-1.5">{commentCreator?.name}</h2>
              <span className="text-gray-500 text-[12px]">
             
                {dayjs(createdAt).format("DD/MM/YYYY h:mm A")}
              </span>
            </div>
            {commentCreator?._id === userId && (
              <div className="dropdown dropdown-start ">
                <i
                  tabIndex={0}
                  role="button"
                  className="fa-solid fa-ellipsis fa-xl hover:text-gray-500 focus:text-gray-500"
                ></i>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-30 p-2 shadow-sm"
                >
                  <li>
                    <label htmlFor="editCommentModal" role="button">
                      Edit
                    </label>
                  </li>
                  <li>
                    <DeleteComment id={_id} />
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="w-full">
          <div className="card bg-base-100  shadow-sm ms-12">
            <div className="card-body ">
              <div className="flex justify-between">
                <p>{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <input type="checkbox" id="editCommentModal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <UpdateComment id={_id} />
        </div>
      </div>
    </>
  );
}
