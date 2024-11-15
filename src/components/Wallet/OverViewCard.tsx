const WalletOverView = () => {
    return (
      <div className="w-full max-w-4xl mx-auto rounded-lg border border-gray-300 p-5 bg-white  dark:bg-[#37404F] dark:border-strokedark">
        {/* Balance and Stats Section */}
        <div className="grid grid-cols-3 gap-4 items-center text-center mb-4">
          {/* Wallet Balance */}
          <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-700 rounded-md p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-blue-500 mb-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-black dark:text-white">$1,100</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">Wallet Balance</p>
          </div>
  
          {/* Money Gained */}
          <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-700 rounded-md p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-green-500 mb-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              />
            </svg>
            <span className="text-lg font-semibold text-black dark:text-white">$500</span>
            <p className="text-sm text-gray-600 dark:text-gray-300">Money Gained</p>
          </div>
  
          {/* Money Spent */}
          <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-700 rounded-md p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-red-500 mb-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              />
            </svg>
            <span className="text-lg font-semibold text-black dark:text-white">$300</span>
            <p className="text-sm text-gray-600 dark:text-gray-300">Money Spent</p>
          </div>
        </div>
  
        {/* Action Buttons Section */}
        <div className="flex justify-end items-end gap-4 mt-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
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
          <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
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
  