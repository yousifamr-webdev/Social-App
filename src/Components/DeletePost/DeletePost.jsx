import React from "react";
import "./DeletePost.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function DeletePost({ postId }) {

  let queryClient = useQueryClient()

  function DeletePost() {
    axios
      .delete(`https://linked-posts.routemisr.com/posts/${postId}`, {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((res) => {
        if (res.data.message === "success") {
          toast.success("Your post was deleted successfully!");
          queryClient.invalidateQueries({ queryKey: ["getUserPosts"] });
          queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
          queryClient.invalidateQueries({ queryKey: ["getSinglePost"] });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  }

  return <button onClick={()=>{DeletePost()}}>Delete</button>;
}
