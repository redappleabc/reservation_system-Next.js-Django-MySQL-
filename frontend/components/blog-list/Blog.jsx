import Link from "next/link";
import blogContent from "../../data/blogs";
import Image from "next/image";

const Blog = () => {
  return (
    <>
      {blogContent.slice(6, 9).map((item) => (
        <div className="for_blog feat_property" key={item.id}>
          <div className="thumb">
            <Link href={`/blog-details/${item.id}`}>
              <Image
                width={731}
                height={438}
                priority
                className="img-whp cover w-100"
                src={item.img}
                alt={item.img}
              />
            </Link>
            <div className="blog_tag">{item.postMeta}</div>
          </div>
          {/* End .thumb */}

          <div className="details">
            <div className="tc_content">
              <h4 className="mb15">
                <Link href={`/blog-details/${item.id}`}>{item.title}</Link>
              </h4>
              <p>{item.postDescriptions.slice(0, 285)}</p>
            </div>
            {/* End .tc_content */}

            <div className="fp_footer">
              <ul className="fp_meta float-start mb0">
                <li className="list-inline-item">
                  <a href="#">
                    <Image
                      width={40}
                      height={40}
                      src={item.posterAvatar}
                      alt={item.posterAvatar}
                    />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">{item.posterName}</a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <span className="flaticon-calendar pr10"></span>{" "}
                    {item.postedDate}
                  </a>
                </li>
              </ul>
              <a className="fp_pdate float-end text-thm" href="#">
                Read More <span className="flaticon-next"></span>
              </a>
            </div>
            {/* End fb_footer */}
          </div>
          {/* End .thumb */}
        </div>
      ))}
    </>
  );
};

export default Blog;
