import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import BeneficiaryDetails from "./BeneficiaryDetails";
import ContactInformation from "./ContactInformation";
import WorkInformation from "./WorkInformation";
import UserDetailsCard from "./UserDetailsCard";

const Profile = async () => {
  const session = await getServerSession(authOptions());

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <h2 className="mb-4 text-[#AFAFAF]">My Profile</h2>
      <div className="space-y-6">
        <UserDetailsCard />
        <ContactInformation />
        <WorkInformation />
        <BeneficiaryDetails />
      </div>
    </div>
  );
};

export default Profile;
