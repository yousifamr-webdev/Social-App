import React from "react";
import "./UpdateComment.module.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function UpdateComment({ id }) {
  let queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      content: "",
    },
  });

  const { register, handleSubmit } = form;

  function handleUpdateComment(value) {
    axios
      .put(`https://linked-posts.routemisr.com/comments/${id}`, value, {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((res) => {
        if (res.data.message === "success") {
          toast.success("Your comment was updated successfully!");
          queryClient.invalidateQueries({ queryKey: ["getUserPosts"] });
          queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
          queryClient.invalidateQueries({ queryKey: ["getSinglePost"] });
          document.getElementById("editCommentModal").checked = false;
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  }
  return (
    <>
      <form onSubmit={handleSubmit(handleUpdateComment)}>
        <fieldset className="fieldset -mt-2">
          <div className="flex justify-between items-center">
            <legend className="fieldset-legend text-xl">Add Comment</legend>
            <div>
              <label
                htmlFor="editCommentModal"
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

          <div className="flex justify-end mt-2">
            <button className=" btn btn-neutral rounded ">Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  );
}
