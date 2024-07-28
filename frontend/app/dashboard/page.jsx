import Activities from "./Activities";
import AllStatistics from "./AllStatistics";
import DashboardNavigation from "./DashboardNavigation";
import StatisticsChart from "./StatisticsChart";

const Dashboard = () => {
  return (
    <div className="row">
      <div className="col-lg-12 mb10">
        <div className="breadcrumb_content style2">
          <h2 className="breadcrumb_title">Howdy, Hasan</h2>
          <p>We are glad to see you again!</p>
        </div>
      </div>
      <div className="row">
        <AllStatistics />
      </div>
      <div className="row">
        <div className="col-xl-7">
          <div className="application_statics">
            <h4 className="mb-4">View Statistics</h4>
            <StatisticsChart />
          </div>
        </div>
        <div className="col-xl-5">
          <div className="recent_job_activity">
            <h4 className="title mb-4">Recent Activities</h4>
            <Activities />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
