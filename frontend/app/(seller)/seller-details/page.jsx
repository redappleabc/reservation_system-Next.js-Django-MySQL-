import dynamic from "next/dynamic";
import SellerDetails from "@/components/seller-details";

export const metadata = {
  title: 'Agent Details || Logo - Real Estate React Template',
  description:
    'Logo - Real Estate React Template',
}

const index = () => {
  return (
    <>
      <SellerDetails />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
