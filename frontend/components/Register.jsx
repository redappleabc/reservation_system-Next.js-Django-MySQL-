import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { AuthActions } from "@/app/auth/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from 'react-hot-toast';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import { frontendAxiosInstance } from "@/utils/http-common";
import { signup, resetStatus, setUserAndAuthenticate } from "@/store/slices/authSlice";
import { toastOption } from "@/utils/toastOption";

const Register = ({ onClose }) => {

  const dispatch = useDispatch();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isFocusNameField, setIsFocusNameField] = useState(false);
  const [errorNameMessage, setErrorNameMessage] = useState("");

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isFocusEmailField, setIsFocusEmailField] = useState(false);
  const [errorEmailMessage, setErrorEmailMessage] = useState("");

  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isFocusPasswordField, setIsFocusPasswordField] = useState(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);
  const [isFocusConfirmPasswordField, setIsFocusConfirmPasswordField] = useState(false);
  const [errorConfirmPasswordMessage, setErrorConfirmPasswordMessage] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [role, setRole] = useState('seller');

  const [isCheckedTerms, setIsCheckedTerms] = useState(false);

  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");

  const nameValidator = (username) => {
    if (username.length === 0) {
      setIsValidUsername(false);
      setErrorNameMessage("この項目は必須です。");
      return
    }
    setIsValidUsername(true);
    setErrorNameMessage("");
  }

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

  const confirmPasswordValidator = (password, confirmPassword) => {
    if (confirmPassword.length === 0) {
      setIsValidConfirmPassword(false);
      setErrorConfirmPasswordMessage("確認のためにパスワードを再入力する必要があります。");
      return;
    }

    if (confirmPassword !== password) {
      setIsValidConfirmPassword(false);
      setErrorConfirmPasswordMessage("確認パスワードが同じではありません。");
      return;
    }

    setIsValidConfirmPassword(true);
    setErrorConfirmPasswordMessage("");
  }

  const handleRoleChange = (role) => {
    setRole(role);
  }

  useEffect(() => {
    return () => {
      dispatch(resetStatus());
    }
  }, [])

  useEffect(() => {
    nameValidator(username);
  }, [username])

  useEffect(() => {
    emailValidator(email);
  }, [email])

  useEffect(() => {
    passwordValidator(password);
  }, [password])

  useEffect(() => {
    confirmPasswordValidator(password, confirmPassword);
  }, [password, confirmPassword])

  useEffect(() => {
    if (isValidUsername && isValidEmail && isValidPassword && isValidConfirmPassword && isCheckedTerms) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [isValidUsername, isValidEmail, isValidPassword, isValidConfirmPassword, isCheckedTerms])

  const handleSubmit = async () => {
    if (isValid) {
      const payload = { username, email, password, role }
      try {
        const res = await frontendAxiosInstance.post('auth/register', payload);
        const user = res.data.result.user;
        toast.success(res.data.message, toastOption);
        setError("");
        if (user.role !== 'buyer') {
          router.push('/dashboard');
        }
        onClose();
        dispatch(setUserAndAuthenticate({
          user,
          isAuthenticate: true,
        }))
      } catch (err) {
        const errorMessage = err.response.data.error;
        setError(errorMessage);
        toast.error(err.response.data.error, toastOption);
      }
    }
  };

  return (
    <div>
      <div className="heading text-center">
        <h3>新規登録</h3>
        <p className="text-center">
          アカウントをお持ちの方はこちら{" "}
          <Link href="/auth/login" className="text-thm">
            ログイン
          </Link>
        </p>
      </div>
      <div className="d-flex flex-column">
        <div className="form-group input-group">
          <input
            type="text"
            className="form-control"
            name="username"
            value={username}
            placeholder="ユーザー名"
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => setIsFocusNameField(true)}
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="flaticon-user"></i>
            </div>
          </div>
        </div>
        <div>
          {
            !isValidUsername && isFocusNameField && (
              <p className="text-danger small">{errorNameMessage}</p>
            )
          }
        </div>
      </div>
      <div className="d-flex flex-column">
        <div className="form-group input-group mt-3">
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            placeholder="メールアドレス"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setIsFocusEmailField(true)}
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fa fa-envelope-o"></i>
            </div>
          </div>
        </div>
        <div>
          {
            !isValidEmail && isFocusEmailField && (
              <p className="text-danger small">{errorEmailMessage}</p>
            )
          }
        </div>
      </div>
      <div className="d-flex flex-column gap-2">
        <div className="form-group input-group mt-3">
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control"
            name="password"
            value={password}
            placeholder="パスワード"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setIsFocusPasswordField(true)}
          />
          <div className="input-group-prepend">
            <button className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>
        </div>
        <div>
          {
            !isValidPassword && isFocusPasswordField && (
              <p className="text-danger small">{errorPasswordMessage}</p>
            )
          }
        </div>
      </div>
      <div className="d-flex flex-column gap-2">
        <div className="form-group input-group mt-3">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            className="form-control"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="パスワードを確認する"
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => setIsFocusConfirmPasswordField(true)}
          />
          <div className="input-group-prepend">
            <button className="input-group-text" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
            </button>
          </div>
        </div>
        <div>
          {
            !isValidConfirmPassword && isFocusConfirmPasswordField && (
              <p className="text-danger small">{errorConfirmPasswordMessage}</p>
            )
          }
        </div>
      </div>
      <div className="form-group row align-items-center justify-content-center mx-0 my-2">
        <div className="form-check col">
          <input className="form-check-input" type="checkbox" name="role" id="flexRadioDefault1"
            onChange={() => handleRoleChange("buyer")} checked={role === 'buyer'}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault1">
            買い手
          </label>
        </div>
        <div className="form-check col">
          <input className="form-check-input" type="checkbox" name="role" id="flexRadioDefault2"
            onChange={() => handleRoleChange("seller")} checked={role === 'seller'}
          />
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
          checked={isCheckedTerms}
          id="terms"
          onChange={() => setIsCheckedTerms(!isCheckedTerms)}
        />
        <label className="form-check-label form-check-label" htmlFor="terms">
          利用規約とプライバシーポリシーに同意します。
        </label>
      </div>
      <button type="button" className="btn btn-log w-100 btn-thm" disabled={!isValid} onClick={handleSubmit}>
        新規登録
      </button>
      <div className="divide">
        <span className="lf_divider">または</span>
        <hr />
      </div>
      <div className="row mt25">
        <div className="col-lg-12">
          <button type="button" className="btn btn-googl w-100" disabled={!isValid}>
            <i className="fa fa-google float-start mt5"></i>Googleで登録する
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

export default Register;
