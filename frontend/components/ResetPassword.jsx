import React from "react";
import { useForm } from "react-hook-form";
import { AuthActions } from "@/app/auth/utils";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { resetPassword } = AuthActions();

  const onSubmit = async (data) => {
    try {
      await resetPassword(data.email).res();
      alert("Password reset email sent. Please check your inbox.");
    } catch (err) {
      alert("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="heading text-center">
        <h3>Reset Password</h3>
      </div>
      <div className="input-group mb-2 mr-sm-2">
        <input
          type="email"
          className="form-control"
          name="email"
          {...register("email", { required: true })}
          placeholder="メールアドレス"
        />
        {errors.email && (
          <span className="text-xs text-red-600">Email is required</span>
        )}
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-user"></i>
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-log w-100 btn-thm">
        Send Reset Email
      </button>
    </form>
  );
};

export default ResetPassword;
