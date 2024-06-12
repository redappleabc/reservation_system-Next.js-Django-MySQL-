import dynamic from "next/dynamic";
import SellerView from "@/components/seller-view";

export const metadata = {
  title: 'Simple Listing – Agent V1 || FindHouse - Real Estate React Template',
  description:
    'FindHouse - Real Estate React Template',
}

const index = () => {
    return (
        <>
            <SellerView />
        </>
    );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
