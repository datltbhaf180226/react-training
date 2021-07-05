import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const isValidEmail = (email) =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

function Login({onLogin = () => {}}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onLogin(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-rows">
        <input
          // placeholder="Email"
          type="text"
          {...register("email", {
            validate: {
              isRequired: (value) => value.length > 0,
              isValid: (value) => isValidEmail(value),
            },
          })}
        />
        {errors.email && errors.email.type === "isRequired" && (
          <p className="message">Email is required</p>
        )}
        {errors.email && errors.email.type === "isValid" && (
          <p className="message">This email is invalid</p>
        )}
      </div>

      <div className="input-rows">
        <input
          placeholder="Password"
          type="password"
          {...register("password", {
            validate: {
              isValid: (value) => value.length > 8,
            },
          })}
        />
        {errors.password && errors.password.type === "isValid" && (
          <p className="message">
            The password must be greater than 8 characters
          </p>
        )}
      </div>
      <div className="submit-btn">
        <input type="submit" />
      </div>
    </form>
  );
}

export default Login;
