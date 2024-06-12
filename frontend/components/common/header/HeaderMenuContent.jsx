"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MyAccount from "./MyAccount";
import Image from "next/image";

const HeaderMenuContent = ({ float = "", isAuthenticated }) => {
  const pathname = usePathname();
  console.log(isAuthenticated);
  return (
    <div>
      {isAuthenticated ? (
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
                <Image
                  width={45}
                  height={45}
                  className="rounded-circle"
                  src="/assets/images/team/e1.png"
                  alt="e1.png"
                />
                <span className="dn-1199 ms-1">Haru</span>
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
