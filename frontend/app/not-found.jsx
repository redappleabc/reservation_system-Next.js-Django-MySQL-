


import dynamic from "next/dynamic";
import NotFound from "@/app/404/page";

export const metadata = {
  title: '404 Not Found || Logo - Real Estate React Template',
  description:
    'Logo - Real Estate React Template',
}

const index = () => {
  return (
    <>
      <NotFound />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
