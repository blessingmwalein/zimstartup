import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../state/store";
import { fetchUserWallet } from "../../../state/slices/walletSlice";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MoneyDisplay from "../common/MoneyDisplay";
import Link from "next/link";

const WalletOverView = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { status, error: reduxError, walletBalance } = useSelector(
    (state: any) => state.wallet
  );

  const getWalletBalance = async () => {
    try {
      await dispatch(fetchUserWallet("632095320E63")).unwrap();
    } catch (err: any) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    getWalletBalance();
  }, [dispatch]);

  const isLoading = status === "loading";

  return (
    <div className="mx-auto w-full bg-white  dark:border-strokedark dark:bg-[#37404F]">
      {/* Balance and Stats Section */}
      <div className="mb-4 grid grid-cols-3 items-center gap-4 text-center">
        {/* Wallet Balance */}
        <div className="flex flex-col items-center rounded-lg border border-gray-300 bg-gray-100 p-3 dark:bg-gray-700">
          {isLoading ? (
            <>
              <Skeleton circle width={24} height={24} className="mb-1" />
              <Skeleton width={60} height={24} />
              <Skeleton width={80} height={12} />
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mb-1 h-6 w-6 text-blue-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h2 className="text-xl font-semibold text-black dark:text-white">
                {/* {walletBalance ? `$${walletBalance}` : "$0"} */}
                <MoneyDisplay amount={walletBalance?.cash} />
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Wallet Balance ({walletBalance?.currency})
              </p>
            </>
          )}
        </div>

        {/* Money Gained */}
        <div className="flex flex-col items-center rounded-lg border border-gray-300 bg-gray-100 p-3 dark:bg-gray-700">
          {isLoading ? (
            <>
              <Skeleton circle width={24} height={24} className="mb-1" />
              <Skeleton width={60} height={24} />
              <Skeleton width={80} height={12} />
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mb-1 h-6 w-6 text-green-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                />
              </svg>
              <span className="text-lg font-semibold text-black dark:text-white">
                $0.00
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Total Sold Stocks
              </p>
            </>
          )}
        </div>

        {/* Money Spent */}
        <div className="flex flex-col items-center rounded-lg border border-gray-300 bg-gray-100 p-3 dark:bg-gray-700">
          {isLoading ? (
            <>
              <Skeleton circle width={24} height={24} className="mb-1" />
              <Skeleton width={60} height={24} />
              <Skeleton width={80} height={12} />
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mb-1 h-6 w-6 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                />
              </svg>
              <span className="text-lg font-semibold text-black dark:text-white">
                $0.00
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Total Bought Stocks
              </p>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="mt-4 flex items-end justify-end gap-4">
        <Link
          href={`/wallet/exchange-cash`}
          className="flex items-center gap-2 rounded-md bg-green-500 px-4 py-2 text-white transition hover:bg-green-600">
          Exchange Cash
        </Link>
        <Link
          href={`/wallet/buy-stock`}
          className="flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
          Buy Stock
        </Link>
        <Link
          href={`/wallet/sell-stock`}
          className="flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-600">
          Sell Stock
        </Link>
      </div>
    </div>
  );
};

export default WalletOverView;
