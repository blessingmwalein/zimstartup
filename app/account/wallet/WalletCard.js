const WalletCard = () => {
  return (
    <div className="flex-[1] relative w-full max-w-[500px] h-[200px] sm:h-[230px] flex flex-col bg-primary justify-between p-7 rounded-2xl ">
      <div className="mt-5">
        <p className="text-[15px] text-[#DBF226] leading-tight">
          Wallet Number
        </p>
        <h3 className="text-[#DBF226] leading-tight">***************2924</h3>
      </div>

      <div className="flex justify-between items-center ">
        <div>
          <p className="text-[12px] text-[#DBF226] leading-none">Valid Till</p>
          <h6 className="text-[18px] text-[#DBF226]">12/12/2025</h6>
        </div>

        <div>
          <p className="text-[12px] text-[#DBF226] leading-none">
            Wallet Holder
          </p>
          <h6 className="text-[18px] text-[#DBF226]">John Doe</h6>
        </div>

        <div className="flex">
          <div className="w-12 h-12 rounded-full bg-[#DBF226] opacity-50 " />
          <div className="w-12 h-12 rounded-full bg-[#DBF226] opacity-50 -ml-5" />
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
