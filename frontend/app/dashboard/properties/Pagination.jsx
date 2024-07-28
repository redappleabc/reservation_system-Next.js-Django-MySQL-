"use client";

import { useSearchParams, useRouter } from "next/navigation";

const Pagination = ({ maxPage = 29 }) => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const makePageQuery = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    searchParams.entries().forEach(([key, value]) => {
      if (key === 'page') value = page;
      params.set(key, value);
    });
    router.push(`/dashboard/properties?${params.toString()}`, { scroll: false });
  }

  const handleClickPreviousBtn = () => {
    const currentPage = searchParams.get('page');
    if (currentPage > 1) {
      makePageQuery(currentPage - 1);
    }
  }

  const handleClickNextBtn = () => {
    const currentPage = Number(searchParams.get('page'));
    if (currentPage < maxPage) {
      makePageQuery(currentPage + 1);
    }
  }

  const handleClickPageItem = (e) => {
    const selectedPageNum = e.target.innerText;
    if (selectedPageNum !== '...') {
      makePageQuery(selectedPageNum);
    }
  }

  return (
    <ul className="page_navigation">
      <li className="page-item">
        <button className="page-link" tabIndex="-1" onClick={handleClickPreviousBtn} disabled={searchParams.get('page') <= 1}>
          {" "}
          <span className="flaticon-left-arrow"></span>
        </button>
      </li>
      <li className={`page-item ${Number(searchParams.get('page')) === 1 && 'active'}`} aria-current="page">
        <button className='page-link' onClick={handleClickPageItem}>
          1
        </button>
      </li>
      <li className={`page-item ${Number(searchParams.get('page')) === 2 && 'active'}`}>
        <button className="page-link" onClick={handleClickPageItem}>
          {
            searchParams.get('page') < 5 ? 2 : '...'
          }
        </button>
      </li>
      <li className={`page-item ${Number(searchParams.get('page')) === 3 && 'active'}`}>
        <button className="page-link" onClick={handleClickPageItem}>
          {
            searchParams.get('page') < 5 ? 3 : (searchParams.get('page') >= maxPage - 2 ? maxPage - 4 : searchParams.get('page') - 1)
          }
        </button>
      </li>
      <li className={`page-item ${Number(searchParams.get('page')) >= 4 && Number(searchParams.get('page')) <= maxPage - 3 && 'active'}`}>
        <button className="page-link" onClick={handleClickPageItem}>
          {
            Number(searchParams.get('page')) < 5 ? 4 : (searchParams.get('page') >= maxPage - 2 ? maxPage - 3 : searchParams.get('page'))
          }
        </button>
      </li>
      <li className={`page-item ${Number(searchParams.get('page')) === maxPage - 2 && 'active'}`}>
        <button className="page-link" onClick={handleClickPageItem}>
          {
            Number(searchParams.get('page')) < 5 ? 5 : (searchParams.get('page') >= maxPage - 2 ? maxPage - 2 : Number(searchParams.get('page')) + 1)
          }
        </button>
      </li>
      <li className={`page-item ${Number(searchParams.get('page')) === maxPage - 1 && 'active'}`}>
        <button className="page-link" onClick={handleClickPageItem}>
          {
            searchParams.get('page') >= maxPage - 3 ? maxPage - 1 : '...'
          }
        </button>
      </li>
      <li className={`page-item ${Number(searchParams.get('page')) === maxPage && 'active'}`}>
        <button className="page-link" onClick={handleClickPageItem}>
          {maxPage}
        </button>
      </li>
      <li className="page-item">
        <button className="page-link" onClick={handleClickNextBtn} disabled={searchParams.get('page') >= maxPage}>
          <span className="flaticon-right-arrow"></span>
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
