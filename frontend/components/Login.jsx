"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { frontendAxiosInstance } from "@/utils/http-common";
import { setUserAndAuthenticate } from "@/store/slices/authSlice";

import { toastOption } from "@/utils/toastOption";

const Login = ({ onClose }) => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   setError,
  // } = useForm();

  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isFocusEmailField, setIsFocusEmailField] = useState(false);
  const [errorEmailMessage, setErrorEmailMessage] = useState("");

  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isFocusPasswordField, setIsFocusPasswordField] = useState(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");

  const emailValidator = (email) => {
    if (email.length === 0) {
      setErrorEmailMessage("メールアドレスを入力する必要があります。");
      setIsValidEmail(false);
      return;
    }
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(email)) {
      setErrorEmailMessage("メールアドレスが正しくありません。");
      setIsValidEmail(false);
      return;
    }
    setErrorEmailMessage("");
    setIsValidEmail(true);
  }

  const passwordValidator = (password) => {
    const uppercaseRegExp = /[A-Z]/g;
    const specialCharacterRegExp = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

    if ((password.length < 8) || ((password.match(uppercaseRegExp) || []).length < 1) || (!specialCharacterRegExp.test(password))) {
      setErrorPasswordMessage("大文字、英、数字、記号を各1つ以上かつ8文字以上入力");
      setIsValidPassword(false);
      return;
    }
    setErrorPasswordMessage("");
    setIsValidPassword(true);
  }

  useEffect(() => {
    emailValidator(email);
  }, [email])

  useEffect(() => {
    passwordValidator(password);
  }, [password])

  useEffect(() => {
    if (isValidEmail && isValidPassword) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [isValidEmail, isValidPassword])

  const handleSubmit = async () => {
    if (isValid) {
      try {
        const data = {
          email,
          password
        }
        const res = await frontendAxiosInstance.post("auth/login", data);
        toast.success(res.data.message, toastOption);
        setError("");
        const user = res.data.result.user;
        const payload = {
          isAuthenticate: true,
          user,
        }
        if (user.role !== 'buyer') {
          router.push('/dashboard');
        }
        dispatch(setUserAndAuthenticate(payload));
        onClose();
      } catch (err) {
        setError(err.response?.data?.error);
        toast.error(err.response?.data?.error, toastOption);
      }
    } else {
      return;
    }
  }

  return (
    <div>

      <div className="heading text-center">
        <h3>ログイン</h3>
        <p className="text-center">
          アカウントをお持ちでない方はこちら{" "}
          <Link href="/auth/register" className="text-thm">
            新規登録
          </Link>
        </p>
      </div>

      <div className="d-flex flex-column">
        <div className="form-group input-group">
          <input
            type="text"
            className="form-control"
            style={{ marginBottom: '5px' }}
            name="email"
            value={email}
            placeholder="メールアドレス"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setIsFocusEmailField(true)}
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="flaticon-user"></i>
            </div>
          </div>
        </div>
        <div>
          {
            !isValidEmail && isFocusEmailField && (
              <p className="small text-danger">{errorEmailMessage}</p>
            )
          }
        </div>
      </div>

      <div className="d-flex flex-column mt-2">
        <div className="input-group form-group">
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control"
            style={{ marginBottom: '5px' }}
            name="password"
            value={password}
            placeholder="パスワード"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setIsFocusPasswordField(true)}
          />
          <div className="input-group-prepend d-flex flex-row">
            <button className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>
        </div>
        <div className="text-xs text-danger">
          {
            !isValidPassword && isFocusPasswordField && (
              <p className="text-xs text-danger">{errorPasswordMessage}</p>
            )
          }
        </div>
      </div>

      <div className="form-group form-check custom-checkbox mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="remeberMe"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
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
      <button type="button" className="btn btn-log w-100 btn-thm"
        style={{
          cursor: isValid ? "pointer" : "not-allowed",
        }}
        disabled={!isValid}
        onClick={handleSubmit}>
        ログイン
      </button>
      <div className="divide">
        <span className="lf_divider">または</span>
        <hr />
      </div>
      <div className="row mt25">
        <div className="col-lg-12">
          <button type="button" className="btn btn-googl w-100">
            <i className="fa fa-google float-start mt5"></i>Googleでログイン
          </button>
        </div>
      </div>
      <div>
        {
          error && (
            <p className="mt-2 text-center text-danger fw-semibold fs-6">{error}</p>
          )
        }
      </div>
    </div>
  );
};

export default Login;
