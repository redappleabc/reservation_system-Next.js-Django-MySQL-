import React from "react";
import { useForm } from "react-hook-form";
import { AuthActions } from "@/app/auth/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const router = useRouter();

  const { register: registerUser } = AuthActions();

  const onSubmit = (data) => {
    registerUser(data.email, data.username, data.password)
      .json(() => {
        router.push("/");
        toast.success("Register Success!");
      })
      .catch((err) => {
        setError("root", {
          type: "manual",
          message: err.json.detail,
        });
        toast.error("Something went wrong.");
      });
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
      <div className="form-group input-group">
        <input
          type="text"
          className="form-control"
          name="username"
          {...register("username", { required: "Username is required" })}
          placeholder="ユーザー名"
        />
        {errors.username && (
          <span className="text-xs text-red-600">
            {errors.username.message}
          </span>
        )}
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-user"></i>
          </div>
        </div>
      </div>
      <div className="form-group input-group my-3">
        <input
          type="email"
          className="form-control"
          name="email"
          {...register("email", { required: "Email is required" })}
          required
          placeholder="メールアドレス"
        />
        {errors.email && (
          <span className="text-xs text-red-600">{errors.email.message}</span>
        )}
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fa fa-envelope-o"></i>
          </div>
        </div>
      </div>
      <div className="form-group input-group">
        <input
          type="password"
          className="form-control"
          name="password"
          {...register("password", { required: "Password is required" })}
          placeholder="パスワード"
        />
        {errors.password && (
          <span className="text-xs text-red-600">
            {errors.password.message}
          </span>
        )}
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-password"></i>
          </div>
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
