import DashboardNavigation from "../DashboardNavigation";
import ChangePassword from "./ChangePassword";
import ProfileInfo from "./ProfileInfo";
import SocialMedia from "./SocialMedia";

const Profile = () => {
  return (
    <>
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                <DashboardNavigation/>
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
