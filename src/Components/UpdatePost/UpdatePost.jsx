import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function UpdatePost({ postId }) {


let queryClient = useQueryClient()

  const form = useForm({
    defaultValues: {
      body: "",
      image: "",
    },
  });

  const { register, handleSubmit } = form;

  async function handleUpdatePost(value) {
    let postData = new FormData();
    postData.append("body", value.body);
    postData.append("image", value.image[0]);

    try {
      let res = await axios.put(
        `https://linked-posts.routemisr.com/posts/${postId}`,
        postData,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
     
      if (res.data.message === "success") {
        toast.success("Your post was updated successfully!");
     queryClient.invalidateQueries({ queryKey: ["getUserPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getSinglePost"] });
 document.getElementById("editPostModal").checked = false; 
      }
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleUpdatePost)}>
      <fieldset className="fieldset -mt-2">
        <div className="flex justify-between items-center mb-3">
          <legend className="fieldset-legend text-xl">Edit Post</legend>
          <div>
            <label
              htmlFor="editPostModal"
              className="hover:text-gray-400 cursor-pointer"
            >
              <i className="fa-solid fa-xmark fa-xl"></i>
            </label>
          </div>
        </div>
        <textarea
          className="textarea textarea-bordered rounded w-full resize-y"
          placeholder="Start Typing..."
          rows="3"
          {...register("body")}
        ></textarea>
        <div className="flex justify-between mt-2">
          <input
            type="file"
            className="file-input file-input-ghost"
            {...register("image")}
          />

          <button type="submit" className="btn btn-neutral ">
            Submit
          </button>
        </div>
      </fieldset>
    </form>
  );
}
