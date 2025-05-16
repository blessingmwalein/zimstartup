import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "@/components/ClickOutside";

// props on log out event
import { useDispatch, useSelector } from "react-redux";
import { UserResponse } from '../../../state/models/user';
import InitialsAvatar from "./Avatar";
import { Building2, CircleUser, LogOut, Menu, WalletCards } from "lucide-react";

interface DropdownUserProps {
  onLogOut: () => void; // Expecting a function prop `onLogOut`
}

const DropdownUser: React.FC<DropdownUserProps> = ({ onLogOut }) => {
  const { status, error: reduxError, user } = useSelector((state: any) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  //log out user

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center text-white gap-4 border-2 border-white rounded-full py-2 px-4"
        href="#"
      >
        <Menu />
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-white dark:text-white">
            {user?.first_name} {user?.last_name}
          </span>
          {/* <span className="block text-base">{user?.username}</span> */}
        </span>

        {/* <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src={"/images/user/user-01.png"}
            style={{
              width: "auto",
              height: "auto",
            }}
            alt="User"
          />
        </span> */}
        {/* {user &&   <InitialsAvatar firstName={user?.first_name} lastName={user?.last_name} size="4rem" />} */}


      </Link>

      {/* Dropdown Start */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
        >
          <ul className="flex flex-col gap-5 border-b text-black/80 border-stroke px-6 py-7.5 dark:border-strokedark">
            <li>
              <Link
                href="/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                onClick={() => setDropdownOpen(false)} // Close the dropdown after clicking the link
              >
                <CircleUser />
                My Profile
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                onClick={() => setDropdownOpen(false)} // Close the dropdown after clicking the link
              >
                <WalletCards />
                Wallet
              </Link>
            </li>
            <li>
              <Link
                href="/profile/wallet"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                onClick={() => setDropdownOpen(false)} // Close the dropdown after clicking the link
              >
                <Building2 />
                My Companies
              </Link>
            </li>
            <hr />
            <li>
              <Link
                href="#"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                onClick={onLogOut} // Close the dropdown after clicking the link
              >
                <LogOut />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
      {/* Dropdown End */}
    </ClickOutside>
  );
};

export default DropdownUser;
