import Link from "next/link";

const CopyrightFooter = () => {
  const menuItems = [
    { id: 1, name: "Home", routeLink: "/" },
    { id: 2, name: "サービス", routeLink: "/listing-grid-v1" },
    { id: 4, name: "Lapazについて", routeLink: "/about-us" },
    { id: 5, name: "ブログ", routeLink: "/blog-list-3" },
    { id: 6, name: "お問い合わせ", routeLink: "/contact" },
  ];

  return (
    <div className="row">
      <div className="col-lg-6 col-xl-6">
        <div className="footer_menu_widget">
          <ul>
            {menuItems.map((item) => (
              <li className="list-inline-item" key={item.id}>
                <Link href={item.routeLink}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col-lg-6 col-xl-6">
        <div className="copyright-widget text-end">
          <p>
            Copyright &copy; 2024 CO.LTD
          </p>
        </div>
      </div>
    </div>
  );
};

export default CopyrightFooter;
