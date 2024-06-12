import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthActions } from "@/app/auth/utils";
import { useSearchParams, useRouter } from "next/navigation";

const ResetPasswordConfirmation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { resetPasswordConfirm } = AuthActions();

  const searchParams = useSearchParams();

  // State for UID and Token
  const [uid, setUid] = useState("");
  const [token, setToken] = useState("");

  // Extract UID and Token from URL
  useEffect(() => {
    if (searchParams.get("uid") && searchParams.get("token")) {
      setUid(searchParams.get("uid"));
      setToken(searchParams.get("token"));
    }
  }, [searchParams]);

  const onSubmit = async (data) => {
    try {
      await resetPasswordConfirm(
        data.password,
        data.password,
        token,
        uid
      ).res();
      alert("Password has been reset successfully.");
      router.push("/");
    } catch (err) {
      alert("Failed to reset password. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="heading text-center">
        <h3>Set New Password</h3>
      </div>
      <div className="input-group mb-2 mr-sm-2">
        <input
          type="password"
          className="form-control"
          name="password"
          {...register("password", { required: true })}
          placeholder="Enter your new password"
        />
        {errors.password && (
          <span className="text-xs text-red-600">Password is required</span>
        )}
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-password"></i>
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-log w-100 btn-thm">
        Reset Password
      </button>
    </form>
  );
};

export default ResetPasswordConfirmation;
