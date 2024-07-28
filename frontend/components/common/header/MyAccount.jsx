'use client'

import Link from "next/link";
import { isSinglePageActive } from "../../../utils/daynamicNavigation";
import Image from "next/image";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import DefaultAvatar from "@/public/assets/images/team/default_avatar.jpg";
import { frontendAxiosInstance } from "@/utils/http-common";
import { logout, resetStatus, setUserAndAuthenticate } from "@/store/slices/authSlice";

const MyAccount = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleShowLoginSignupModal = () => {
    const modalContent = document.querySelector(".modal-content");
    if (modalContent) {
      modalContent.style.display = "block";
    }
  }

  const profileMenuItems = [
    { key: 'profile', name: " プロフィール", targetLink: "/dashboard/profile" },
    { key: 'message', name: " チャット", targetLink: "/dashboard/message" },
    { key: 'my-favourites', name: " プラン", targetLink: "/dashboard/my-favourites" },
    { key: 'my-package', name: " 予約一覧", targetLink: "/dashboard/my-package" },
    { key: 'setting', name: " 設  定", targetLink: "/dashboard/setting" },
    { key: 'logout', name: " ログアウト", targetLink: "#" },
  ];

  const handleClickMenuItem = async (item) => {
    if (item.key !== 'logout') {
      router.push(item.targetLink, { scroll: false });
    } else {
      const confirmMessage = "このサイトを本当に終了してもよろしいですか?";
      if (window.confirm(confirmMessage)) {
        try {
          const res = await frontendAxiosInstance.get('auth/logout');
          dispatch(setUserAndAuthenticate({
            user: null,
            isAuthenticate: false
          }));
          router.push('/');
          handleShowLoginSignupModal();
        } catch (err) {
          console.error(err);
        }
      } else {
        return;
      }
    }
  }

  return (
    <>
      <div className="user_set_header d-flex flex-row align-items-center">
        <img
          width={40}
          height={40}
          className="float-start"
          src={user?.avatar ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${user.avatar}` : "/assets/images/team/default_avatar.jpg"}
          alt="avatar"
        />
        <p>
          {_.get(user, 'display_name', 'user')}
          <br />
          <span className="address">{_.get(user, 'email', 'Email')}</span>
        </p>
      </div>
      <div className="user_setting_content">
        {profileMenuItems.map((item, index) => (
          <div
            key={index}
            className="dropdown-item header-dropdownmenu-item"
            style={
              `${item.targetLink}` === pathname
                ? { color: "#ff5a5f" }
                : undefined
            }
            onClick={() => handleClickMenuItem(item)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </>
  );
};

export default MyAccount;
