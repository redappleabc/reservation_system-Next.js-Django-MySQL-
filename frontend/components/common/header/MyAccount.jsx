'use client'

import Link from "next/link";
import { isSinglePageActive } from "../../../utils/daynamicNavigation";
import Image from "next/image";
import { usePathname } from "next/navigation";

const MyAccount = () => {
  const pathname = usePathname()
  const profileMenuItems = [
    { id: 1, name: " プロフィール", ruterPath: "/profile" },
    { id: 2, name: " チャット", ruterPath: "/message" },
    { id: 3, name: " プラン", ruterPath: "/my-favourites" },
    { id: 4, name: " 予約一覧", ruterPath: "/my-package" },
    { id: 5, name: " 設　定", ruterPath: "#" },
    { id: 6, name: " ログアウト", ruterPath: "/login" },
  ];

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
        {profileMenuItems.map((item) => (
          <Link
            href={item.ruterPath}
            key={item.id}
            className="dropdown-item"
            style={
              isSinglePageActive(`${item.ruterPath}`, pathname)
                ? { color: "#ff5a5f" }
                : undefined
            }
          >
            {item.name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default MyAccount;
