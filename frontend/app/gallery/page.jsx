import BreadCrumbBanner from "./BreadCrumbBanner";
import GalleryBox from "./GalleryBox";

const Gallery = () => {
  return (
    <>
      <BreadCrumbBanner />
      <section className="about-section pb30">
        <div className="container">
          <div className="row">
            <GalleryBox />
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;
