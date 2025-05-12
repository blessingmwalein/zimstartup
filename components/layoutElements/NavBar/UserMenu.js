import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";
import { FiMenu } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";

const items = [
  {
    href: "/account/profile",
    name: "Profile",
  },
  {
    href: "/account/wallet",
    name: "Wallet",
  },
  {
    href: "/account/my-companies",
    name: "My Companies",
  },
];

const UserMenu = ({}) => {
  const user = useSelector((store) => store.user.user);

  async function _onLogout() {
    signOut({ callbackUrl: "/" });
  }

  return (
    <div className="relative text-primary ">
      <Menu as="div">
        <div>
          <Menu.Button className="flex justify-center items-center space-x-3 border-2  border-white py-2 px-3 rounded-full ring-white  hover:ring-1 ">
            <FiMenu className="text-[18px] text-white" />
            <div className="h-[27px] w-[27px] flex justify-center items-center bg-[#0093d4] rounded-full">
              <p className="text-white">
                {user?.first_name?.[0]?.toUpperCase()}
              </p>
            </div>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="absolute right-0  mt-3 w-[300px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-[100]">
            <Menu.Item as="div" className="p-3">
              {({ close }) => (
                <div>
                  {items
                    .filter((item) => !item.hidden)
                    .map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={() => {
                          close();
                        }}
                        className="w-full relative block text-[14px]  pl-3 py-2 md:py-3 rounded-md hover:bg-[#f7fade]">
                        {item.name}
                      </Link>
                    ))}

                  <hr className="my-3" />
                  <button
                    onClick={_onLogout}
                    className="w-full flex items-center space-x-2  pl-3 py-2 text-primary   rounded-md hover:bg-[#f7fade]">
                    <MdLogout className="text-[23px]" />{" "}
                    <p className="text-[13px] font-[700]">Logout</p>
                  </button>
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserMenu;
