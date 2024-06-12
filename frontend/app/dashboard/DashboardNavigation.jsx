const DashboardNavigation = () => {
  return (
    <div className="col-lg-12">
      <div className="dashboard_navigationbar dn db-1024">
        <div className="dropdown">
          <button
            className="dropbtn"
            data-bs-toggle="offcanvas"
            data-bs-target="#DashboardOffcanvasMenu"
            aria-controls="DashboardOffcanvasMenu"
          >
            <i className="fa fa-bars pr10"></i> Dashboard Navigation
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavigation;
