"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { AuthActions } from "@/app/auth/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

const Login = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const router = useRouter();

  const { login, storeToken } = AuthActions();

  const onSubmit = (data) => {
    login(data.email, data.password)
      .json((json) => {
        storeToken(json.access, "access");
        storeToken(json.refresh, "refresh");
        toast.success("Logged in");
        onClose(); 
        router.push("/dashboard");
      })
      .catch((err) => {
        setError("root", { type: "manual", message: err.json.detail });
        toast.error(err);
      });
  };

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
      <div className="input-group mb-2 mr-sm-2">
        <input
          type="text"
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
      <div className="input-group form-group">
        <input
          type="password"
          className="form-control"
          name="password"
          {...register("password", { required: true })}
          placeholder="パスワード"
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
