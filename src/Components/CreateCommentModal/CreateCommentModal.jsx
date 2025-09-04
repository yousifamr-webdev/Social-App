import React from "react";
import "./CreateCommentModal.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateCommentModal({ postId }) {
  let queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      content: "",
      post: postId,
    },
  });

  const { register, handleSubmit } = form;

  async function addComment(value) {
    try {
      let res = await axios.post(
        `https://linked-posts.routemisr.com/comments`,
        value,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );

      if (res.data.message === "success") {
        toast.success("Your comment was added successfully!");
        queryClient.invalidateQueries({ queryKey: ["getUserPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getSinglePost"] });
        document.getElementById("addCommentModal").checked = false;
      }
    } catch (err) {
      toast.error(err);
    }
  }

  return (
    <>
      <label
        htmlFor="addCommentModal"
        className="btn w-1/3 inline-flex items-center justify-center gap-2"
      >
        <i className="fa-solid fa-comment text-lg leading-none"></i>
        <span>Comment</span>
      </label>
      <input type="checkbox" id="addCommentModal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <form onSubmit={handleSubmit(addComment)}>
            <fieldset className="fieldset -mt-2">
              <div className="flex justify-between items-center">
                <legend className="fieldset-legend text-xl">Add Comment</legend>
                <div>
                  <label
                    htmlFor="addCommentModal"
                    className="hover:text-gray-400 cursor-pointer"
                  >
                    <i className="fa-solid fa-xmark fa-xl"></i>
                  </label>
                </div>
              </div>

              <textarea
                className="textarea textarea-bordered rounded w-full resize-y"
                placeholder="Add your comment here..."
                rows="3"
                {...register("content")}
              ></textarea>
              <input
                type="text"
                value={postId}
                {...register("post")}
                className="hidden"
              />
              <div className="flex justify-end mt-2">
                <button className=" btn btn-neutral rounded">Submit</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}
