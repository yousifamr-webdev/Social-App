import React, { useActionState } from "react";
import "./ChangePasswordModal.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ChangePasswordModal() {
  const schema = z.object({
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (#?!@$%^&*-)."
      ),
    newPassword: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (#?!@$%^&*-)."
      ),
  });

  const form = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState } = form;

  function handleChangePassword(value) {
    axios
      .patch(
        `https://linked-posts.routemisr.com/users/change-password`,
        value,
        { headers: { token: localStorage.getItem("userToken") } }
      )
      .then((res) => {
        if (res.data.message === "success") {
          localStorage.setItem("userToken", res.data.token);
          toast.success("Your password was changed successfully!");
          document.getElementById("changePasswordModal").checked = false;
        }
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response?.data?.error);
      });
  }

  return (
    <>
      <label htmlFor="changePasswordModal" className="btn btn-neutral">
        <span>Change Password</span>
      </label>
      <input
        type="checkbox"
        id="changePasswordModal"
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <form onSubmit={handleSubmit(handleChangePassword)}>
            <fieldset className="fieldset -mt-2">
              <div className="flex justify-between items-center mb-3">
                <legend className="fieldset-legend text-xl">
                  Change your password
                </legend>
                <div>
                  <label
                    htmlFor="changePasswordModal"
                    className="hover:text-gray-400 cursor-pointer"
                  >
                    <i className="fa-solid fa-xmark fa-xl"></i>
                  </label>
                </div>
              </div>
              <label className="floating-label mb-3">
                <span>Old Password</span>
                <input
                  type="password"
                  className="input input-md w-full"
                  placeholder="Old Password"
                  {...register("password")}
                  id="password"
                />
              </label>
              {formState.errors.password && formState.touchedFields.password ? (
                <div
                  role="alert"
                  className="alert alert-error alert-soft mb-1.5"
                >
                  <span>{formState.errors.password.message}</span>
                </div>
              ) : (
                ""
              )}
              <label className="floating-label mb-3">
                <span>New Password</span>
                <input
                  type="password"
                  className="input input-md w-full"
                  placeholder="New Password"
                  {...register("newPassword")}
                  id="newPassword"
                />
              </label>
              {formState.errors.newPassword &&
              formState.touchedFields.newPassword ? (
                <div
                  role="alert"
                  className="alert alert-error alert-soft mb-1.5"
                >
                  <span>{formState.errors.newPassword.message}</span>
                </div>
              ) : (
                ""
              )}
              <div className="card-actions justify-end">
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
