"use client";

import Link from "next/link";
import useSWR from "swr";
import { AuthActions } from "../../../app/auth/utils";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import _ from "lodash";

import { fetcher } from "../../../app/fetcher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYenSign, faCartPlus, faMoneyCheck, faLayerGroup } from "@fortawesome/free-solid-svg-icons";

import {
  isParentPageActive,
  isSinglePageActive,
} from "../../../utils/daynamicNavigation";
import { logout } from "@/store/slices/authSlice";

import { DashboardMenu, DashboardMenuCategory } from "@/utils/menuInfo";
import Dashboard from "@/app/dashboard/page";

const SidebarMenu = () => {

  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const { user } = useSelector(state => state.auth);
  
  const myProperties = [
    { id: 1, name: "General Elements", route: "/dashboard/properties" },
    { id: 2, name: "Advanced Elements", route: "/dashboard/properties" },
    { id: 3, name: "Editors", route: "/dashboard/properties" },
  ];
  const reviews = [
    { id: 1, name: "My Reviews", route: "/dashboard/review#mine" },
    { id: 2, name: "Visitor Reviews", route: "/dashboard/review#visitor" },
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

  // const { data: user } = useSWR("/auth/users/me", fetcher);

  const handleLogout = () => {
    const confirmMessage = "このサイトを本当に終了してもよろしいですか?";
    if (window.confirm(confirmMessage)) {
      dispatch(logout());
      router.push("/");
    } else {
      return;
    }
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

            <ul className="px-3 py-4 d-flex flex-column">
              {
                user && DashboardMenuCategory.map((category, categoryIndex) => DashboardMenu.filter(item => item.category === category.key).filter(item => item.role.includes(user.role)).length > 0 && (
                  <li key={categoryIndex} className={`${categoryIndex ? 'pt-4' : 'pt-0' }`}>
                    <span className="text-white" style={{ fontSize: '18px' }}>{category.value}</span>
                    <ul>
                      {
                        DashboardMenu.filter(item => item.category === category.key).filter(item => item.role.includes(user.role)).map((mainItem, index) => (
                          <li key={index}>
                            <ul>
                              {
                                mainItem.children !== undefined && Array.isArray(mainItem.children) ? (
                                  <li>
                                    <a type="btn" data-bs-toggle="collapse" href={`#${mainItem.key}`} className="" >
                                      <FontAwesomeIcon icon={mainItem.icon} />
                                      <span>{mainItem.value}</span>
                                      <i className="fa fa-angle-down pull-right"></i>
                                    </a>
                                    <ul className="treeview-menu collapse" id={mainItem.key}>
                                      {
                                        mainItem.children.map((subItem, subIndex) => (
                                          <li key={subIndex} className={`treeview ${isSinglePageActive(`/dashboard/${subItem.path}`, pathname) ? 'active' : ''}`}>
                                            <Link href={`/dashboard/${subItem.path}`} >
                                              {
                                                subItem.icon ? (
                                                  <FontAwesomeIcon icon={subItem.icon} />
                                                ) : (
                                                  <i className="fa fa-circle"></i>
                                                )
                                              }
                                              <span>{subItem.value}</span>
                                            </Link>
                                          </li>
                                        ))
                                      }
                                    </ul>
                                  </li>
                                ) : (
                                  <li className={`treeview ${isSinglePageActive((mainItem.path ? `/dashboard/${mainItem.path}` : '/dashboard'), pathname) ? 'active' : ''}`}>
                                    <Link href={`/dashboard/${mainItem.path}`}>
                                      <FontAwesomeIcon icon={mainItem.icon} />
                                      <span>{mainItem.value}</span>
                                    </Link>
                                  </li>
                                )
                              }
                            </ul>
                          </li>
                        ))
                      }
                    </ul>
                  </li>
                ))
              }
            </ul>

            <ul>
              <div className="logout" onClick={handleLogout}>
                <i className="flaticon-logout"></i>
                <span className="">ログアウト</span>
              </div>
            </ul>

            {/* <li className="title">
              <span>Main</span>
              <ul>
                <li
                  className={`treeview ${isSinglePageActive("/dashboard", pathname)
                    ? "active"
                    : ""
                    }`}
                >
                  <Link href="/dashboard">
                    <span> Dashboard</span>
                  </Link>
                </li>
                <li
                  className={`treeview ${isSinglePageActive("/dashboard/create-listing", pathname)
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
                  className={`treeview ${isSinglePageActive("/dashboard/message", pathname) ? "active" : ""
                    }`}
                >
                  <Link href="/dashboard/message">
                    <i className="flaticon-envelope"></i>
                    <span> メッセージ</span>
                  </Link>
                </li>
              </ul>
            </li> */}
            {/* <li className="title">
              <span>Manage Service Listings</span>
              <ul>
                <li
                  className={`treeview ${isParentPageActive(myProperties, pathname) ? "active" : ""
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

                <li
                  className={`treeview ${isParentPageActive(reviews, pathname) ? "active" : ""
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
                  className={`treeview ${isSinglePageActive("/dashboard/price-request", pathname)
                    ? "active"
                    : ""
                    }`}
                >
                  <Link href="/dashboard/price-request">
                    <FontAwesomeIcon icon={faYenSign} />
                    <span> 振込申請</span>
                  </Link>
                </li>
                <li
                  className={`treeview ${isSinglePageActive("/dashboard/subscription", pathname)
                    ? "active"
                    : ""
                    }`}
                >
                  <Link href="/dashboard/subscription">
                    <FontAwesomeIcon icon={faCartPlus} />
                    <span> サブスクリプション</span>
                  </Link>
                </li>
                <li
                  className={`treeview ${isSinglePageActive("/dashboard/point-back", pathname)
                    ? "active"
                    : ""
                    }`}
                >
                  <Link href="/dashboard/point-back">
                    <FontAwesomeIcon icon={faMoneyCheck} />
                    <span> ポイントパック</span>
                  </Link>
                </li>
              </ul>
            </li> */}
            {/* <li className="title">
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
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
