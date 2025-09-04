import React from "react";
import "./DeleteComment.module.css";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function DeleteComment({ id }) {


  let queryClient = useQueryClient();
  async function handleDeleteComment() {
    try {
      let res = await axios.delete(
        `https://linked-posts.routemisr.com/comments/${id}`,
        {
          headers: { token: localStorage.getItem("userToken") },
        },
     
      );    if (res.data.message === "success") {
        toast.success("Your comment was deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["getUserPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getSinglePost"] });
      
      }
    } catch (err) {
      toast.error(err);
    }
  }

  return (
    <>
      <button onClick={()=>{handleDeleteComment()}}>Delete</button>
    </>
  );
}
