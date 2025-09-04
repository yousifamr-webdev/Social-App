import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function CreatePost() {
  let queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      body: "",
      image: "",
    },
  });

  const { register, handleSubmit, reset } = form;

  async function handleAddPost(value) {
    let postData = new FormData();
    postData.append("body", value.body);
    postData.append("image", value.image[0]);

    try {
      let res = await axios.post(
        `https://linked-posts.routemisr.com/posts`,
        postData,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      console.log(res);
      if (res.data.message === "success") {
        toast.success("Your post was added successfully!");
        queryClient.invalidateQueries({ queryKey: ["getUserPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getSinglePost"] });
        reset()
      }
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleAddPost)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box lg:w-3xl md:w-2xl sm:w-md border p-4 sm:mx-auto mx-4">
          <div className="flex justify-between items-center">
            <legend className="fieldset-legend text-xl">Add Post</legend>
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

            <button className="btn btn-neutral ">Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  );
}
