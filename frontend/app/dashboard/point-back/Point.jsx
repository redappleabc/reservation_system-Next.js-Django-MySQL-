import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const Point = () => {
  const pointContent = [
    {
      id: 1,
      ponitNumber: "22000",
      priceNumber:"20000"
    },
    {
      id: 2,
      ponitNumber: "11000",
      priceNumber:"10000"
    },
    {
      id: 3,
      ponitNumber: "5500",
      priceNumber:"5000"
    },
    {
      id: 4,
      ponitNumber: "3300",
      priceNumber:"3000"
    },
  ];
  return (
    <>
      {pointContent.map((item) => (
        <div className="col-sm-6 col-md-6 col-lg-3" key={item.id}>
          <div className="pricing_table"> 
            <div className="row">
              <h2 className="price">{item.ponitNumber}PT</h2>
            </div>
            <div className="arrow my-3">
              <FontAwesomeIcon icon={faArrowDown}/>
            </div>
            <div className="row">
              <h3 className="price">{item.priceNumber}¥</h3>
            </div>
            <div className="pricing_footer">
              <a className="btn pricing_btn btn-block" href="#">
                購　入
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Point;
