import React, { useState } from "react";
import "./Register.module.css";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import coverImage from "../../assets/socialApp_Full.png"

export default function Register() {
  const navigate = useNavigate();
  const [apiError, setapiError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const schema = z
    .object({
      name: z
        .string()
        .min(1, "Name is Required.")
        .max(10, "Max Length is 10 Characters."),
      email: z.email("Invalid Email."),
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (#?!@$%^&*-)."
        ),
      rePassword: z.string(),
      dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid Date.")
        .refine((date) => {
          const userDate = new Date(date);
          const nowDate = new Date();
          nowDate.setHours(0, 0, 0, 0);
          return userDate < nowDate;
        }, "Date cannot be set in the future."),
      gender: z.enum(
        ["male", "female"],
        "Gender must be either Male or Female."
      ),
    })
    .refine((object) => object.password === object.rePassword, {
      error: "Passwords do not match",
      path: ["rePassword"],
    });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
  });

  let { register, handleSubmit, formState } = form;

  function handleRegister(values) {
    setisLoading(true);
    axios
      .post(`https://linked-posts.routemisr.com/users/signup`, values)
      .then((res) => {
        if (res.data.message === "success") {
          setisLoading(false);
          navigate("/login");
        }
      })
      .catch((err) => {
        setisLoading(false);
        setapiError(err.response.data.error);
      });
  }

  return (
    <>
      <div className="flex lg:justify-between justify-center items-center">
        <img src={coverImage} className="w-xl hidden lg:block" />
        <div className="flex justify-center items-center">
          <h1 className="text-8xl lg:text-9xl italic"></h1>
        </div>
        <div>
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="flex justify-center items-center"
          >
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              <legend className="fieldset-legend">Register</legend>

              <label className="floating-label mb-3">
                <span>Name</span>
                <input
                  type="text"
                  className="input input-md"
                  placeholder="Name"
                  {...register("name")}
                  id="name"
                />
              </label>
              {formState.errors.name && formState.touchedFields.name ? (
                <div
                  role="alert"
                  className="alert alert-error alert-soft mb-1.5"
                >
                  <span>{formState.errors.name.message}</span>
                </div>
              ) : (
                ""
              )}
              <label className="floating-label mb-3">
                <span>Email</span>
                <input
                  type="email"
                  className="input input-md"
                  placeholder="Email"
                  {...register("email")}
                  id="email"
                />
              </label>
              {formState.errors.email && formState.touchedFields.email ? (
                <div
                  role="alert"
                  className="alert alert-error alert-soft mb-1.5"
                >
                  <span>{formState.errors.email.message}</span>
                </div>
              ) : (
                ""
              )}

              <label className="floating-label mb-3">
                <span>Password</span>
                <input
                  type="password"
                  className="input input-md"
                  placeholder="Password"
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
                <span>Confirm Password</span>
                <input
                  type="password"
                  className="input input-md"
                  placeholder="Re-enter password"
                  {...register("rePassword")}
                  id="rePassword"
                />
              </label>
              {formState.errors.rePassword &&
              formState.touchedFields.rePassword ? (
                <div
                  role="alert"
                  className="alert alert-error alert-soft mb-1.5"
                >
                  <span>{formState.errors.rePassword.message}</span>
                </div>
              ) : (
                ""
              )}

              <label className="floating-label mb-3">
                <span>Birthday</span>
                <input
                  type="date"
                  className="input input-md"
                  placeholder="dateOfBirth"
                  {...register("dateOfBirth")}
                  id="dateOfBirth"
                />
              </label>
              {formState.errors.dateOfBirth &&
              formState.touchedFields.dateOfBirth ? (
                <div
                  role="alert"
                  className="alert alert-error alert-soft mb-1.5"
                >
                  <span>{formState.errors.dateOfBirth.message}</span>
                </div>
              ) : (
                ""
              )}

              <div className="flex gap-4">
                <div
                  className="flex items-center gap-1.5
          "
                >
                  <input
                    type="radio"
                    {...register("gender")}
                    className="radio-md"
                    id="male"
                    value="male"
                  />
                  <label className="label" htmlFor="male">
                    Male
                  </label>
                </div>

                <div className="flex items-center gap-1.5">
                  <input
                    type="radio"
                    {...register("gender")}
                    className="radio-md"
                    id="female"
                    value="female"
                  />
                  <label className="label" htmlFor="female">
                    Female
                  </label>
                </div>
              </div>
              {formState.errors.gender && formState.touchedFields.gender ? (
                <div
                  role="alert"
                  className="alert alert-error alert-soft mb-1.5"
                >
                  <span>{formState.errors.gender.message}</span>
                </div>
              ) : (
                ""
              )}

              <button
                type="submit"
                className="btn btn-neutral mt-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <i className="fas fa-spinner fa-spin text-white"></i>
                ) : (
                  "Sign up"
                )}
              </button>
              {apiError && (
                <div
                  role="alert"
                  className="alert alert-error alert-soft mb-1.5"
                >
                  <span>{apiError}</span>
                </div>
              )}
              <div className="flex gap-2 justify-center items-center mt-3 text-[14px]">
                <p>Already have an account?</p>
                <Link
                  to="/login"
                  className="text-primary hover:text-blue-700 underline underline-offset-1 text-[16px] "
                >
                  Login
                </Link>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}
