import React, { useActionState } from "react";
import "./UploadProfilePhoto.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function UploadProfilePhoto() {
  let queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      photo: "",
    },
  });

  const { register, handleSubmit } = form;

  function handleUploadPhoto(value) {
    let newPhoto = new FormData();
    newPhoto.append("photo", value.photo[0]);

    axios
      .put(`https://linked-posts.routemisr.com/users/upload-photo`, newPhoto, {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((res) => {
        if (res.data.message === "success") {
          toast.success("Your profile picture was changed successfully!");
          queryClient.invalidateQueries({ queryKey: ["getUserPosts"] });
          queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
          queryClient.invalidateQueries({ queryKey: ["getSinglePost"] });
          queryClient.invalidateQueries({ queryKey: ["getUserData"] });
          document.getElementById("uploadPhotoModal").checked = false;
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  return (
    <>
      <label htmlFor="uploadPhotoModal" className="btn btn-neutral">
        <span>Change Profile Picture</span>
      </label>
      <input type="checkbox" id="uploadPhotoModal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <form onSubmit={handleSubmit(handleUploadPhoto)}>
            <fieldset className="fieldset -mt-2">
              <div className="flex justify-between items-center mb-3">
                <legend className="fieldset-legend text-xl">
                  Upload photo
                </legend>
                <div>
                  <label
                    htmlFor="uploadPhotoModal"
                    className="hover:text-gray-400 cursor-pointer"
                  >
                    <i className="fa-solid fa-xmark fa-xl"></i>
                  </label>
                </div>
              </div>

              <div className="flex justify-between mt-2">
                <input
                  type="file"
                  className="file-input file-input-ghost"
                  {...register("photo")}
                />
                <button type="submit" className="btn btn-neutral">
                  Submit
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}
