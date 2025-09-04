import React, { useContext, useState } from "react";
import "./Login.module.css";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useQuery } from "@tanstack/react-query";

export default function Login() {
  const navigate = useNavigate();
  const [apiError, setapiError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  let { userLogin, setuserLogin } = useContext(UserContext);

  const schema = z.object({
    email: z.email("Invalid Email."),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (#?!@$%^&*-)."
      ),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  let { register, handleSubmit, formState } = form;

  function getUserData() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data } = useQuery({
    queryKey: ["getUserData"],
    queryFn: getUserData,
    select: (data) => data?.data?.user,
  });

  async function handleLogin(values) {
    setisLoading(true);
    try {
      let res = await axios.post(
        `https://linked-posts.routemisr.com/users/signin`,
        values
      );
      if (res.data.message === "success") {
        setisLoading(false);
        localStorage.setItem("userToken", res.data.token);
        setuserLogin(res.data.token);
        let userRes = await getUserData();
        localStorage.setItem("userId", userRes.data.user._id);
        navigate("/");
      }
    } catch (err) {
      setisLoading(false);
      setapiError(err.response.data.error);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex justify-center items-center"
      >
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ">
          <legend className="fieldset-legend">Login</legend>

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
            <div role="alert" className="alert alert-error alert-soft mb-1.5">
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
            <div role="alert" className="alert alert-error alert-soft mb-1.5">
              <span>{formState.errors.password.message}</span>
            </div>
          ) : (
            ""
          )}

          <button
            type="submit"
            className="btn btn-neutral mt-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin text-white"></i>
            ) : (
              "Login"
            )}
          </button>
          {apiError && (
            <div role="alert" className="alert alert-error alert-soft mb-1.5">
              <span>{apiError}</span>
            </div>
          )}
          <div className="flex gap-2 justify-center items-center mt-3 text-[14px]">
            <p>Don't have an account?</p>
           <Link to="/register" className="text-primary hover:text-blue-700 underline underline-offset-1 text-[16px] ">Register</Link>
          </div>
        </fieldset>
      </form>
    </>
  );
}
