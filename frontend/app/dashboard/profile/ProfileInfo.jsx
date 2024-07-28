"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { format } from "date-fns";

import { frontendAxiosInstance } from "@/utils/http-common";
import { toastOption } from "@/utils/toastOption";
import { setUserAndAuthenticate } from "@/store/slices/authSlice";

const ProfileInfo = () => {

  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState({
    avatar: "",
    display_name: "",
    lastname: "",
    firstname: "",
    gender: "",
    occupationType: "",
    birthday: "",
    phone_number: "",
    address: "",
    catchphrase: "",
    self_introduction: "",
  });
  const [validFileSize, setValidFileSize] = useState(false);
  const [errorFileSize, setErrorFileSize] = useState("");

  const fetchProfileInfo = async () => {
    try {
      const res = await frontendAxiosInstance.get('user/profile');
      const data = res.data.result;

      const { Profile: profileInfo, ...user } = data.user;
      const prevFormData = { ...formData };
      prevFormData.display_name = user.display_name;
      if (profileInfo) {
        Object.entries(profileInfo).forEach(([key, value]) => {
          if (key === 'birthday' && value) {
            value = format(value, 'yyyy-MM-dd');
          }
          prevFormData[key] = value || "";
        })
      }
      setFormData(prevFormData);
    } catch (err) {
      toast.error(err.response.data.error, toastOption);
    }
  }

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const uploadProfile = (e) => {
    const seletedFile = e.target.files[0];
    if (seletedFile) {
      if (seletedFile.size < 10 * 1024 * 1024) {
        setValidFileSize(true);
        setErrorFileSize("");
        setAvatar(seletedFile);
      } else {
        setValidFileSize(false);
        setErrorFileSize("ファイルが大きすぎます。");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'avatar') {
          avatar ? profileData.append('avatar', avatar) : profileData.append('avatar', value);
        } else {
          profileData.append(key, value);
        }
      });
      const res = await frontendAxiosInstance.put("user/profile", profileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = res.data.result;
      const { Profile: profileInfo, ...user } = data.user;

      const prevFormData = { ...formData };
      prevFormData.display_name = user.display_name;

      if (profileInfo) {
        Object.entries(profileInfo).forEach(([key, value]) => {
          if (key === 'birthday' && value) {
            value = format(value, 'yyyy-MM-dd');
          }
          prevFormData[key] = value || "";
        })
      }

      setFormData(prevFormData);

      const payload = {
        user: {
          ...user,
          avatar: profileInfo ? profileInfo.avatar || "" : "",
        },
        isAuthenticate: true,
      }
      dispatch(setUserAndAuthenticate(payload));
      toast.success("Profile Saved Successfully!");
    } catch (error) {
      console.error("Error saving profile data:", error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-12">
          <div className="wrap-custom-file">
            <input
              type="file"
              id="image1"
              accept="image/png, image/gif, image/jpeg, image/jpg"
              onChange={uploadProfile}
            />
            <label
              style={{
                backgroundImage: avatar
                  ? `url(${URL.createObjectURL(avatar)})`
                  : formData.avatar
                    ? `url(${process.env.NEXT_PUBLIC_BACKEND_URL}/${formData.avatar})`
                    : 'url(/assets/images/team/default_avatar.jpg)',
                position: 'absolute'
              }}
              htmlFor="image1"
            >
              {
                formData.avatar && !avatar && <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${formData.avatar}`} alt="avatar" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }} />
              }
              <span>
                <i className="flaticon-download"></i> 写真をアップロード{" "}
              </span>
            </label>
          </div>
          <p className="text-xs text-danger">
            {
              !validFileSize && errorFileSize
            }
          </p>
          <p>
            *3MB以下の
            JPG、PNGファイルを選択してください。正方形の写真を推奨しています。
            <br />
            変更は保存するまで反映されません。
          </p>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="display_name">表示名</label>
            <input
              type="text"
              className="form-control"
              id="display_name"
              name="display_name"
              value={formData.display_name}
              onChange={handleInputChange}
              placeholder="User Name"
            />
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="gender">性別</label>
            <select
              className="selectpicker form-select"
              data-live-search="true"
              data-width="100%"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value=""></option>
              <option value="male">男性</option>
              <option value="female">女性</option>
            </select>
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="firstname">姓</label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              placeholder="姓"
            />
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="lastname">名</label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              placeholder="名"
            />
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="occupationType">現在の職種</label>
            <input
              type="text"
              className="form-control"
              id="occupationType"
              name="occupationType"
              value={formData.occupationType}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="birthday">生年月日</label>
            <input
              type="date"
              className="form-control"
              id="birthday"
              name="birthday"
              value={formData.birthday}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="phone_number">電話番号</label>
            <input
              type="text"
              className="form-control"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-xl-12">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="address">住所</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-xl-12">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="catchphrase">キャッチフレーズ</label>
            <input
              type="text"
              className="form-control"
              id="catchphrase"
              name="catchphrase"
              value={formData.catchphrase}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-xl-12">
          <div className="my_profile_setting_textarea">
            <label htmlFor="self_introduction">自己紹介</label>
            <textarea
              className="form-control"
              id="self_introduction"
              name="self_introduction"
              rows="7"
              value={formData.self_introduction}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
        <div className="col-xl-12 text-right">
          <div className="my_profile_setting_input">
            <button type="submit" className="btn btn2">保存する</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileInfo;
