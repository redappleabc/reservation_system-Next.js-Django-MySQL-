import dynamic from "next/dynamic";
import Blog from "@/components/blog-list";

export const metadata = {
  title: 'Blog List 1 || FindHouse - Real Estate React Template',
  description:
    'FindHouse - Real Estate React Template',
}

const index = () => {
  return (
    <>
      <Blog />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
