import { getServerSession } from "next-auth";
import Transactions from "./Transactions";
import WalletActions from "./WalletActions";
import WalletCard from "./WalletCard";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Wallet = async () => {
  const session = await getServerSession(authOptions());

  if (!session) {
    redirect("/");
  }
  return (
    <div>
      <h2 className="mb-4 text-[#AFAFAF]">My Wallet</h2>
      <div className="md:grid  grid-cols-7  gap-7 mb-11">
        <div className="col-span-4  xl:col-span-3">
          <WalletCard />
        </div>

        <div className="col-span-3 xl:col-span-4">
          <WalletActions />
        </div>
      </div>

      <h3 className="mb-4 text-[#AFAFAF]">My Transitions</h3>

      <Transactions />
    </div>
  );
};

export default Wallet;
