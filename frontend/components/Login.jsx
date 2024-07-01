"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import { login, resetStatus } from "@/store/slices/authSlice";
import { toastOption } from "@/utils/toastOption";

const Login = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const dispatch = useDispatch();
  const router = useRouter();

  const { login_status, errorMessage } = useSelector(state => state.auth);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(login(data));
  };

  useEffect(() => {
    switch (login_status) {
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
  }, [login_status])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className="heading text-center">
        <h3>ログイン</h3>
        <p className="text-center">
          アカウントをお持ちでない方はこちら{" "}
          <Link href="/auth/register" className="text-thm">
            新規登録
          </Link>
        </p>
      </div>

      <div className="d-flex flex-column gap-2">
        <div className="input-group mb-2 mr-sm-2">
          <input
            type="text"
            className="form-control"
            name="email"
            {...register("email", { required: true })}
            placeholder="メールアドレス"
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="flaticon-user"></i>
            </div>
          </div>
        </div>
        {errors.email && (
          <span className="text-xs text-red-600">Email is required</span>
        )}
      </div>

      <div className="d-flex flex-column gap-2">
        <div className="input-group form-group">
          <input
            type="password"
            className="form-control"
            name="password"
            {...register("password", { required: true })}
            placeholder="パスワード"
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="flaticon-password"></i>
            </div>
          </div>
        </div>
        {errors.password && (
          <span className="text-xs text-red-600">Password is required</span>
        )}
      </div>

      <div className="form-group form-check custom-checkbox mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="remeberMe"
        />
        <label
          className="form-check-label form-check-label"
          htmlFor="remeberMe"
        >
          次回から自動的にログイン
        </label>
      </div>

      <Link
        href="/auth/password/reset-password"
        className="btn-fpswd float-end mb-3"
      >
        パスワードを忘れた方はこちら
      </Link>
      <button type="submit" className="btn btn-log w-100 btn-thm">
        ログイン
      </button>
      <div className="divide">
        <span className="lf_divider">または</span>
        <hr />
      </div>
      <div className="row mt25">
        <div className="col-lg-12">
          <button type="submit" className="btn btn-googl w-100">
            <i className="fa fa-google float-start mt5"></i>Googleでログイン
          </button>
        </div>
      </div>
      {errors.root && (
        <span className="text-xs text-red-600">{errors.root.message}</span>
      )}
    </form>
  );
};

export default Login;
