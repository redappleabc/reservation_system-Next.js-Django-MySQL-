'use client'

import Link from "next/link";
import { isSinglePageActive } from "../../../utils/daynamicNavigation";
import Image from "next/image";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { logout, resetStatus } from "@/store/slices/authSlice";

const MyAccount = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const { logout_status } = useSelector(state => state.auth);

  const profileMenuItems = [
    { key: 'profile', name: " プロフィール", targetLink: "/dashboard/profile" },
    { key: 'message', name: " チャット", targetLink: "/dashboard/message" },
    { key: 'my-favourites', name: " プラン", targetLink: "/dashboard/my-favourites" },
    { key: 'my-package', name: " 予約一覧", targetLink: "/dashboard/my-package" },
    { key: 'setting', name: " 設  定", targetLink: "/dashboard/setting" },
    { key: 'logout', name: " ログアウト", targetLink: "#" },
  ];

  const handleClickMenuItem = (item) => {
    if (item.key !== 'logout') {
      router.push(item.targetLink, { scroll: false });
    } else {
      const confirmMessage = "このサイトを本当に終了してもよろしいですか?";
      if (window.confirm(confirmMessage)) {
        dispatch(logout());
        router.push("/");
      } else {
        return;
      }
    }
  }

  return (
    <>
      <div className="user_set_header">
        <Image
          width={40}
          height={40}
          className="float-start"
          src="/assets/images/team/e1.png"
          alt="e1.png"
        />
        <p>
          Hara <br />
          <span className="address">hara@gmail.com</span>
        </p>
      </div>
      <div className="user_setting_content">
        {profileMenuItems.map((item, index) => (
          <div
            key={index}
            className="dropdown-item header-dropdownmenu-item"
            style={
              isSinglePageActive(`${item.targetLink}`, pathname)
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
