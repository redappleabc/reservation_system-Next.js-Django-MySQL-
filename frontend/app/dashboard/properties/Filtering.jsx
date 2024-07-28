"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Filtering = () => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelectSortType = (e) => {
    const sortType = e.target.value;
    const entries = searchParams.entries();
    const params = new URLSearchParams(searchParams.toString());
    for (let [key, value] of entries) {
      if (key === 'sortType') {
        value = sortType;
      }
      params.set(key, value);
    }
    router.push(`/dashboard/properties?${params.toString()}`);
  }

  return (
    <select className="selectpicker show-tick form-select c_select" value={searchParams.get("sortType")}
      onChange={handleSelectSortType}>
      <option value="featured_first">Featured First</option>
      <option value="recent">Recent</option>
      <option value="old_review">Old Review</option>
    </select>
  );
};

export default Filtering;
