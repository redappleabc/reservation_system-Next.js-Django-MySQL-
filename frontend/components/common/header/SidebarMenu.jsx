"use client";

import Link from "next/link";
import useSWR from "swr";
import { AuthActions } from "../../../app/auth/utils";
import { useRouter } from "next/navigation";
import { fetcher } from "../../../app/fetcher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYenSign } from "@fortawesome/free-solid-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";

import {
  isParentPageActive,
  isSinglePageActive,
} from "../../../utils/daynamicNavigation";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SidebarMenu = () => {
  const pathname = usePathname();

  const myProperties = [
    { id: 1, name: "General Elements", route: "/dashboard/properties" },
    { id: 2, name: "Advanced Elements", route: "/dashboard/properties" },
    { id: 3, name: "Editors", route: "/dashboard/properties" },
  ];
  const reviews = [
    { id: 1, name: "My Reviews", route: "/dashboard/review" },
    { id: 2, name: "Visitor Reviews", route: "/dashboard/review" },
  ];
  const manageAccount = [
    {
      id: 1,
      name: "予約一覧",
      route: "/dashboard/package",
      icon: "flaticon-box",
    },
    {
      id: 2,
      name: "プロフィール",
      route: "/dashboard/profile",
      icon: "flaticon-user",
    },
  ];
  const router = useRouter();

  const { data: user } = useSWR("/auth/users/me", fetcher);

  const { logout, removeTokens } = AuthActions();

  const handleLogout = () => {
    logout()
      .res(() => {
        removeTokens();

        router.push("/");
      })
      .catch(() => {
        removeTokens();
        router.push("/");
      });
  };
  return (
    <>
      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <ul className="sidebar-menu">
            <li className="sidebar_header header">
              <Link href="/">
                <Image
                  width={40}
                  height={45}
                  src="/assets/images/header-logo2.png"
                  alt="header-logo2.png"
                />
                <span>Logo</span>
              </Link>
            </li>

            <li className="title">
              <span>Main</span>
              <ul>
                <li
                  className={`treeview ${
                    isSinglePageActive("/dashboard", pathname)
                      ? "active"
                      : ""
                  }`}
                >
                  <Link href="/dashboard">
                    <i className="flaticon-layers"></i>
                    <span> Dashboard</span>
                  </Link>
                </li>
                <li
                  className={`treeview ${
                    isSinglePageActive("/dashboard/create-listing", pathname)
                      ? "active"
                      : ""
                  }`}
                >
                  <Link href="/dashboard/create-listing">
                    <i className="flaticon-plus"></i>
                    <span> サービス登録</span>
                  </Link>
                </li>
                <li
                  className={`treeview ${
                    isSinglePageActive("/dashboard/message", pathname) ? "active" : ""
                  }`}
                >
                  <Link href="/dashboard/message">
                    <i className="flaticon-envelope"></i>
                    <span> メッセージ</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="title">
              <span>Manage Service Listings</span>
              <ul>
                <li
                  className={`treeview ${
                    isParentPageActive(myProperties, pathname) ? "active" : ""
                  }`}
                >
                  <a data-bs-toggle="collapse" href="#my-property">
                    <i className="flaticon-home"></i> <span>My Services</span>
                    <i className="fa fa-angle-down pull-right"></i>
                  </a>
                  <ul className="treeview-menu collapse" id="my-property">
                    {myProperties.map((item) => (
                      <li key={item.id}>
                        <Link href={item.route}>
                          <i className="fa fa-circle"></i> {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                {/* end properties */}

                <li
                  className={`treeview ${
                    isParentPageActive(reviews, pathname) ? "active" : ""
                  }`}
                >
                  <a data-bs-toggle="collapse" href="#review">
                    <i className="flaticon-chat"></i>
                    <span>Reviews</span>
                    <i className="fa fa-angle-down pull-right"></i>
                  </a>
                  <ul className="treeview-menu collapse" id="review">
                    {reviews.map((item) => (
                      <li key={item.id}>
                        <Link href={item.route}>
                          <i className="fa fa-circle"></i> {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li
                  className={`treeview ${
                    isSinglePageActive("/dashboard/price-request", pathname)
                      ? "active"
                      : ""
                  }`}
                >
                  <Link href="/dashboard/price-request">
                    <FontAwesomeIcon icon={faYenSign}/>
                    <span> 振込申請</span>
                  </Link>
                </li>
                <li
                  className={`treeview ${
                    isSinglePageActive("/dashboard/subscription", pathname)
                      ? "active"
                      : ""
                  }`}
                >
                  <Link href="/dashboard/subscription">
                    <FontAwesomeIcon icon={faCartPlus}/>
                    <span> サブスクリプション</span>
                  </Link>
                </li>
                <li
                  className={`treeview ${
                    isSinglePageActive("/dashboard/point-back", pathname)
                      ? "active"
                      : ""
                  }`}
                >
                  <Link href="/dashboard/point-back">
                    <FontAwesomeIcon icon={faMoneyCheck}/>
                    <span> ポイントパック</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="title">
              <span>アカウント管理</span>
              <ul>
                {manageAccount.map((item) => (
                  <li
                    className={
                      isSinglePageActive(item.route, pathname) ? "active" : ""
                    }
                    key={item.id}
                  >
                    <Link href={item.route}>
                      <i className={item.icon}></i> <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <ul>
                <div className="logout" onClick={handleLogout}>
                  <i className="flaticon-logout"></i>
                  <span className="">ログアウト</span>
                </div>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
