import React from "react";

const WalletActions = () => {
  return (
    <div>
      <p className="mt-3 text-[19px] text-primary">Main Balance</p>

      <h1 className=" md:text-[50px]   lg:text-[60px] text-primary">$200.00</h1>

      <div className="flex items-center gap-3 xl:gap-5 mt-5">
        <button className=" flex-[5] py-4 xl:py-5  font-bold text-[13px] sm:text-[14px] xl:text-[17px] bg-[#DBF226] rounded-lg">
          Exchange Cash
        </button>

        <button className=" flex-[4] py-4 xl:py-5 text-primary font-bold text-[13px] sm:text-[14px] xl:text-[17px] border border-primary rounded-lg">
          Withdrawal
        </button>

        <button className=" flex-[3] py-4 xl:py-5 text-primary font-bold text-[13px] sm:text-[14px] xl:text-[17px] border border-primary rounded-lg">
          Deposit
        </button>
      </div>
    </div>
  );
};

export default WalletActions;
