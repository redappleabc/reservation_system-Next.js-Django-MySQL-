"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import MyAccount from "./MyAccount";
import Image from "next/image";
import _ from "lodash";

import DefaultAvatar from "@/public/assets/images/team/default_avatar.jpg";

const HeaderMenuContent = ({ float = "" }) => {
  const pathname = usePathname();

  const { isAuthenticate, user } = useSelector(state => state.auth);

  return (
    <div>
      {isAuthenticate ? (
        <ul
          id="respMenu"
          className="ace-responsive-menu text-end d-lg-block d-none"
          data-menu-style="horizontal"
        >
          <li className="last">
            <Link
              href="/"
              className={pathname === "/" ? "ui-active" : undefined}
            >
              Home
            </Link>
          </li>
          <li className="last">
            <Link
              href="/dashboard"
              className={pathname === "/dashboard" ? "ui-active" : undefined}
            >
              マイページ
            </Link>
          </li>
          <li className="last">
            <Link
              href="/listings"
              className={pathname === "/listings" ? "ui-active" : undefined}
            >
              サービス
            </Link>
          </li>
          <li className="last">
            <Link
              href="/seller-view"
              className={pathname === "/seller-view" ? "ui-active" : undefined}
            >
              Seller一覧
            </Link>
          </li>
          <li className="last">
            <Link
              href="/blog"
              className={pathname === "/blog" ? "ui-active" : undefined}
            >
              ブログ
            </Link>
          </li>
          <li className="last">
            <Link
              href="/contact"
              className={pathname === "/contact" ? "ui-active" : undefined}
            >
              お問い合わせ
            </Link>
          </li>
          <li className="user_setting">
            <div className="dropdown">
              <a
                className="btn dropdown-toggle"
                href="#"
                data-bs-toggle="dropdown"
              >
                <img
                  width={45}
                  height={45}
                  className="rounded-circle"
                  src={user?.avatar ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${user.avatar}` : "/assets/images/team/default_avatar.jpg"}
                  alt="avatar"
                />
                <span className="dn-1199 ms-1">{_.get(user, 'display_name', 'User')}</span>
              </a>
              <div className="dropdown-menu">
                <MyAccount />
              </div>
            </div>
          </li>
        </ul>
      ) : (
        <ul
          id="respMenu"
          className="ace-responsive-menu text-end d-lg-block d-none"
          data-menu-style="horizontal"
        >
          <li className={`list-inline-item list_s ${float}`}>
            <a
              href="#"
              className="btn flaticon-user"
              data-bs-toggle="modal"
              data-bs-target=".bd-example-modal-lg"
            >
              <span className="dn-lg">ログイン/新規登録</span>
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default HeaderMenuContent;
