"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const SearchBox = () => {

  const searchParams = useSearchParams();
  const router = useRouter();

  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

  const handleSearchKeyword = (e) => {
    e.preventDefault();
    const entries = searchParams.entries();
    const params = new URLSearchParams(searchParams.toString());
    for (let [key, value] of entries) {
      if (key === 'keyword') {
        value = keyword;
      }
      params.set(key, value);
    }
    if (!searchParams.has('keyword')) {
      params.set('keyword', keyword);
    }
    router.push(`/dashboard/properties?${params.toString()}`)
  }

  return (
    <form className="d-flex flex-wrap align-items-center my-2">
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Search "
        aria-label="Search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button className=" my-2 my-sm-0" onClick={handleSearchKeyword}>
        <span className="flaticon-magnifying-glass"></span>
      </button>
    </form>
  );
};

export default SearchBox;
