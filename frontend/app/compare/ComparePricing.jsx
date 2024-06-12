import Image from "next/image";
import comparePricingContent from "../../data/comparePricing";

const ComparePricing = () => {
  return (
    <>
      {comparePricingContent.map((item) => (
        <li className="list-inline-item" key={item.id}>
          <ul className="mc_child_list two text-center">
            <li>
              <div className="membership_header">
                <div className="thumb">
                  <a href="#">
                    <span className="flaticon-close"></span>
                  </a>
                  <Image
                    width={260}
                    height={180}
                    className="img-fluid w100 h-100 cover"
                    src={item.img}
                    alt="1.jpg"
                  />
                  <div className="price">
                    ${item.price}
                    <span className="mnth">/mo</span>
                  </div>
                </div>
                <div className="details">
                  <h4>{item.propertyName}</h4>
                  <p>{item.propertyType}</p>
                </div>
              </div>
            </li>
            <li>
              <a href="#">{item.city}</a>
            </li>
            <li>
              <a href="#">{item.beds}</a>
            </li>
            <li>
              <a href="#">{item.rooms}</a>
            </li>
            <li>
              <a href="#">{item.garage}</a>
            </li>
            <li>
              <a href="#">{item.buildYear}</a>
            </li>
            <li>
              <a href="#">{item.laundryRoom}</a>
            </li>
            <li>
              <a className="btn pricing_btn" href="#">
                {item.status}
              </a>
            </li>
          </ul>
        </li>
      ))}
    </>
  );
};

export default ComparePricing;
