import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";

const Sidebar = ({
  company,
  sections,
  onSectionChange,
  isOpen,
  toggleSidebar,
  activeSection,
}) => {
  return (
    <>
      <div className={`hidden md:block w-1/5 bg-[#F1F1E9] p-9 rounded-lg`}>
        <div className="flex items-center mb-4">
          <Image
            alt={company.company_data.company_name}
            src={
              company.company_logo.company_logo.startsWith("/")
                ? company.company_logo.company_logo
                : "/images/cocacola.png"
            }
            width={180}
            height={85}
          />
        </div>
        <ul className="list-none p-0">
          {sections.map((item) => (
            <li key={item} className="py-2">
              <Link
                href="#"
                className={`block text-primary no-underline w-full hover:bg-[#DBF226] p-2 rounded ${
                  activeSection === item ? "bg-[#DBF226] text-primary w-full" : ""
                }`}
                onClick={() => onSectionChange(item)}>
                {capitalizeSectionName(item)}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`fixed left-0 top-2 w-[50%] bg-[#F1F1E9] h-full transform transition-transform ${
          isOpen ? "translate-x-0 top-[65px]" : "-translate-x-full"
        } md:hidden rounded-lg`}>
        <div className="flex justify-between items-center mt-4 p-4">
          <Image
            alt={company.company_data.company_name}
            src={
              company.company_logo.company_logo.startsWith("/")
                ? company.company_logo.company_logo
                : "/images/cocacola.png"
            }
            width={140}
            height={60}
          />
          <button onClick={toggleSidebar} className="text-xl mx-2">
            <AiOutlineClose />
          </button>
        </div>
        <div className="p-6">
          <ul className="list-none p-0">
            {sections.map((item) => (
              <li key={item} className="py-2">
                <Link
                  href="#"
                  className={`block text-primary no-underline w-full hover:bg-[#DBF226] p-2 rounded flex items-center ${
                    activeSection === item ? "bg-[#DBF226] text-white" : ""
                  }`}
                  onClick={() => onSectionChange(item)}>
                  {capitalizeSectionName(item)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const capitalizeSectionName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, " ");
};

export async function getServerSideProps(context) {
  const { company_id } = context.params;
  const session = null;
  let company = null;
  let error = null;

  try {
    const result = await _getCompanyById(company_id, session);
    if (result.success) {
      company = result.data;
    } else {
      error = result.message;
    }
  } catch (err) {
    console.error(err);
    error = "Failed to fetch company details.";
  }

  return {
    props: {
      session,
      company,
      error,
    },
  };
}

export default Sidebar;