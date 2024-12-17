const WalletOverView = () => {
  return (
    <div className="mx-auto w-full  bg-white p-5  dark:border-strokedark dark:bg-[#37404F]">
      {/* Balance and Stats Section */}
      <div className="mb-4 grid grid-cols-3 items-center gap-4 text-center">
        {/* Wallet Balance */}
        <div className="flex flex-col items-center rounded-lg rounded-md border border-gray-300 bg-gray-100 p-3 dark:bg-gray-700">
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
            $1,100
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Wallet Balance
          </p>
        </div>

        {/* Money Gained */}
        <div className="flex flex-col items-center rounded-lg rounded-md border border-gray-300 bg-gray-100 p-3 dark:bg-gray-700">
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
            $500
          </span>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Money Gained
          </p>
        </div>

        {/* Money Spent */}
        <div className="flex flex-col items-center rounded-lg rounded-md border border-gray-300 bg-gray-100 p-3 dark:bg-gray-700">
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
            $300
          </span>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Money Spent
          </p>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="mt-4 flex items-end justify-end gap-4">
        <button className="flex items-center gap-2 rounded-md bg-green-500 px-4 py-2 text-white transition hover:bg-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
            />
          </svg>
          Exchange Cash
        </button>
        <button className="flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
            />
          </svg>
          Buy Stock
        </button>
        <button className="flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
            />
          </svg>
          Sell Stock
        </button>
      </div>
    </div>
  );
};

export default WalletOverView;
