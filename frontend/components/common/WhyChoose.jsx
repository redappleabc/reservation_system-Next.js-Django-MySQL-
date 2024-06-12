const WhyChoose = ({ style = "" }) => {
  const whyCooseContent = [
    {
      id: 1,
      icon: "flaticon-high-five",
      title: "Trusted By Thousands",
      descriptions: `Aliquam dictum elit vitae mauris facilisis at dictum urna
      dignissim donec vel lectus vel felis.`,
    },
    {
      id: 2,
      icon: "flaticon-home-1",
      title: "Wide Renge Of Properties",
      descriptions: `Aliquam dictum elit vitae mauris facilisis at dictum urna
      dignissim donec vel lectus vel felis.`,
    },
    {
      id: 3,
      icon: "flaticon-profit",
      title: "Financing Made Easy",
      descriptions: `Aliquam dictum elit vitae mauris facilisis at dictum urna
      dignissim donec vel lectus vel felis.`,
    },
  ];

  return (
    <>
      {whyCooseContent.map((item) => (
        <div className="col-md-6 col-lg-4 col-xl-4" key={item.id}>
          <div className={`why_chose_us ${style}`}>
            <div className="icon">
              <span className={item.icon}></span>
            </div>
            <div className="details">
              <h4>{item.title}</h4>
              <p>{item.descriptions}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default WhyChoose;
