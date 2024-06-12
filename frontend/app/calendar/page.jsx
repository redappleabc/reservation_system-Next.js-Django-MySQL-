import BreadCrumbBanner from "./BreadCrumbBanner";
import CalendarBox from "./CalendarBox";

const CalendarPage = () => {
  return (
    <>
      <BreadCrumbBanner />
      <section className="about-section pb30">
        <div className="container">
          <div className="row">
            <CalendarBox />
          </div>
        </div>
      </section>
    </>
  );
};

export default CalendarPage;
