"use client";

import DashboardNavigation from "../DashboardNavigation";
import ChangePassword from "./ChangePassword";
import ProfileInfo from "./ProfileInfo";
import SocialMedia from "./SocialMedia";

const Profile = () => {
  return (
    <div className="row">
      <div className="col-lg-12 mb10">
        <div className="breadcrumb_content style2">
          <h2 className="breadcrumb_title">プロフィール編集</h2>
          <p>下記の項目にプロフィール情報を入力してください。</p>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="my_dashboard_review">
          <div className="row">
            <div className="col-xl-2">
              <h4>プロフィール情報</h4>
            </div>
            <div className="col-xl-10">
              <ProfileInfo />
            </div>
          </div>
        </div>
        <div className="my_dashboard_review mt30">
          <div className="row">
            <div className="col-xl-2">
              <h4>Social Media</h4>
            </div>
            <div className="col-xl-10">
              <SocialMedia />
            </div>
          </div>
        </div>
        <div className="my_dashboard_review mt30">
          <div className="row">
            <div className="col-xl-2">
              <h4>パスワード編集</h4>
            </div>
            <div className="col-xl-10">
              <ChangePassword />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
