import Image from "next/image";
import Link from "next/link";

const ClientReview = () => {
  const reviewContent = [
    {
      id: 1,
      img: "/assets/images/resource/review2.png",
      ratings: (
        <>
          {" "}
          <ul>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
          </ul>
        </>
      ),
      reviewOn: "Villa called Archangel",
      text: `Beautiful home, very picturesque and close to everything in jtree! A
          little warm for a hot weekend, but would love to come back during
          the cooler seasons! Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Accusantium voluptates eum, velit recusandae,
          ducimus earum aperiam commodi error officia optio aut et quae nam
          nostrum!`,
    },
    {
      id: 2,
      img: "/assets/images/resource/review3.png",
      ratings: (
        <>
          {" "}
          <ul>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
          </ul>
        </>
      ),
      reviewOn: "Sunset Studio",
      text: `Beautiful home, very picturesque and close to everything in jtree! A
          little warm for a hot weekend, but would love to come back during
          the cooler seasons! Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Accusantium voluptates eum, velit recusandae,
          ducimus earum aperiam commodi error officia optio aut et quae nam
          nostrum!`,
    },
    {
      id: 3,
      img: "/assets/images/resource/review4.png",
      ratings: (
        <>
          {" "}
          <ul>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
          </ul>
        </>
      ),
      reviewOn: "Sunset Studio",
      text: `Beautiful home, very picturesque and close to everything in jtree! A
          little warm for a hot weekend, but would love to come back during
          the cooler seasons! Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Accusantium voluptates eum, velit recusandae,
          ducimus earum aperiam commodi error officia optio aut et quae nam
          nostrum!`,
    },
  ];

  return (
    <>
      {reviewContent.map((item) => (
        <div className="media pb30 mt30" key={item.id}>
          <Image
            width={120}
            height={120}
            className="mr-3"
            src={item.img}
            alt="Review image"
          />
          <div className="media-body">
            <h5 className="review_title mt-0">
              Your review on{" "}
              <Link href="/agency-details/3">
                <span className="text-thm">{item.reviewOn}</span>
              </Link>
              <span className="sspd_review float-end">{item.ratings}</span>
            </h5>
            <a className="review_date" href="#">
              December 28, 2020
            </a>
            <p className="para">{item.text}</p>

            <ul className="view_edit_delete_list mb0 mt35">
              <li
                className="list-inline-item"
                data-toggle="tooltip"
                data-placement="top"
                title="Edit"
              >
                <a href="#">
                  <span className="flaticon-edit"></span>
                </a>
              </li>
              {/* End edit */}

              <li
                className="list-inline-item"
                data-toggle="tooltip"
                data-placement="top"
                title="Delete"
              >
                <a href="#">
                  <span className="flaticon-garbage"></span>
                </a>
              </li>
              {/* End delete */}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default ClientReview;
