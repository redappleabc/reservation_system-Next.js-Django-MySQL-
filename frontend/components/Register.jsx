import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { AuthActions } from "@/app/auth/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from 'react-hot-toast';

import { signup, resetStatus } from "@/store/slices/authSlice";
import { toastOption } from "@/utils/toastOption";

const Register = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    watch,
  } = useForm();

  const dispatch = useDispatch();
  const router = useRouter();

  const { signup_status, errorMessage } = useSelector(state => state.auth);

  const { register: registerUser } = AuthActions();
  const role = watch("role");
  const password = watch("password");

  const handleRoleChange = (role) => {
    setValue("role", role);
  }

  useEffect(() => {
    return () => {
      dispatch(resetStatus());
    }
  }, [])

  useEffect(() => {
    switch (signup_status) {
      case 'success':
        toast.success(errorMessage, toastOption);
        onClose();
        break;
      case 'failed':
        toast.error(errorMessage, toastOption);
        break;
      default:
        break;
    }
  }, [signup_status])

  const onSubmit = (data) => {
    console.log(data);

    dispatch(signup(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="heading text-center">
        <h3>新規登録</h3>
        <p className="text-center">
          アカウントをお持ちの方はこちら{" "}
          <Link href="/auth/login" className="text-thm">
            ログイン
          </Link>
        </p>
      </div>
      <div className="d-flex flex-column gap-2">
        <div className="form-group input-group">
          <input
            type="text"
            className="form-control"
            name="username"
            {...register("username", { required: "Username is required" })}
            placeholder="ユーザー名"
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="flaticon-user"></i>
            </div>
          </div>
        </div>
        {errors.username && (
          <span className="text-danger small">
            {errors.username.message}
          </span>
        )}
      </div>
      <div className="d-flex flex-column gap-2">
        <div className="form-group input-group mt-3">
          <input
            type="email"
            className="form-control"
            name="email"
            {...register("email", { required: "Email is required" })}
            required
            placeholder="メールアドレス"
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fa fa-envelope-o"></i>
            </div>
          </div>
        </div>
        {errors.email && (
          <span className="text-danger small">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="d-flex flex-column gap-2">
        <div className="form-group input-group mt-3">
          <input
            type="password"
            className="form-control"
            name="password"
            {...register("password", { required: "Password is required" })}
            placeholder="パスワード"
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="flaticon-password"></i>
            </div>
          </div>
        </div>
        {errors.password && (
          <span className="text-danger small">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="d-flex flex-column gap-2">
        <div className="form-group input-group mt-3">
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: value =>
                value === password || "Password do not match"
            })}
            placeholder="パスワードを確認する"
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="flaticon-password"></i>
            </div>
          </div>
        </div>
        {errors.confirmPassword && (
          <span className="text-danger small">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
      <div className="form-group row align-items-center justify-content-center mx-0 my-2">
        <div className="form-check col">
          <input className="form-check-input" type="radio" name="role" id="flexRadioDefault1" value="buyer"
            onChange={() => handleRoleChange("buyer")} checked={role === 'buyer'}
            {...register("role", { required: "role is required" })} />
          <label className="form-check-label" htmlFor="flexCheckDefault1">
            買い手
          </label>
        </div>
        <div className="form-check col">
          <input className="form-check-input" type="radio" name="role" id="flexRadioDefault2" value="seller"
            onChange={() => handleRoleChange("seller")} checked={role === 'seller'}
            {...register("role", { required: "role is required" })} />
          <label className="form-check-label" htmlFor="flexCheckDefault2">
            売り手
          </label>
        </div>
      </div>
      <div className="form-group d-flex align-items-center mt-3 form-check custom-checkbox mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          name="agreeTerms"
          required
          id="terms"
        />
        <label className="form-check-label form-check-label" htmlFor="terms">
          利用規約とプライバシーポリシーに同意します。
        </label>
        {errors.agreeTerms && (
          <div className="text-danger">{errors.agreeTerms}</div>
        )}
      </div>
      <button type="submit" className="btn btn-log w-100 btn-thm">
        新規登録
      </button>
      <div className="divide">
        <span className="lf_divider">または</span>
        <hr />
      </div>
      <div className="row mt25">
        <div className="col-lg-12">
          <button type="button" className="btn btn-googl w-100">
            <i className="fa fa-google float-start mt5"></i>Googleで登録する
          </button>
        </div>
      </div>
      {errors.root && (
        <span className="text-xs text-red-600">{errors.root.message}</span>
      )}
    </form>
  );
};

export default Register;
