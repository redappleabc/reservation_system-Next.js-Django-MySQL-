"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ProfileInfo = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    displayName: "",
    lastName: "",
    firstName: "",
    gender: "",
    currentOccupation: "",
    birthday: "",
    phoneNumber: "",
    address: "",
    catchPhrase: "",
    introduction: "",
  });

  const uploadProfile = (e) => {
    setProfile(e.target.files[0]);
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
      profileData.append("profile_image", profile);
      Object.entries(formData).forEach(([key, value]) => {
        profileData.append(key, value);
      });
      const response = await axios.post("/api/profiles/", profileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Profile data saved:", response.data);
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
              accept="image/png, image/gif, image/jpeg"
              onChange={uploadProfile}
            />
            <label
              style={
                profile !== null
                  ? {
                      backgroundImage: `url(${URL.createObjectURL(profile)})`,
                    }
                  : undefined
              }
              htmlFor="image1"
            >
              <span>
                <i className="flaticon-download"></i> 写真をアップロード{" "}
              </span>
            </label>
          </div>
          <p>
            *3MB以下の
            JPG、PNGファイルを選択してください。正方形の写真を推奨しています。
            <br />
            変更は保存するまで反映されません。
          </p>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="displayName">表示名</label>
            <input
              type="text"
              className="form-control"
              id="displayName"
              name="displayName"
              value={formData.displayName}
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
              <option value="male">男性</option>
              <option value="female">女性</option>
            </select>
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="firstName">姓</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="姓"
            />
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="lastName">名</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="名"
            />
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="currentOccupation">現在の職種</label>
            <input
              type="text"
              className="form-control"
              id="currentOccupation"
              name="currentOccupation"
              value={formData.currentOccupation}
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
            <label htmlFor="phoneNumber">電話番号</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
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
            <label htmlFor="catchPhrase">キャッチフレーズ</label>
            <input
              type="text"
              className="form-control"
              id="catchPhrase"
              name="catchPhrase"
              value={formData.catchPhrase}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-xl-12">
          <div className="my_profile_setting_textarea">
            <label htmlFor="introduction">自己紹介</label>
            <textarea
              className="form-control"
              id="introduction"
              name="introduction"
              rows="7"
              value={formData.introduction}
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
