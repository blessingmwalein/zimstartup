import TextArea from "@/components/material/TextArea";
import TextField from "@/components/material/TextField";
import Image from "next/image";
import Link from "next/link";

const actions = [
  {
    name1: "Register",
    name2: "a Company",
    image: "/images/edit.webp",
    bg: "bg-[#F1F1E9]",
  },

  {
    name1: "Select",
    name2: "a Company",
    image: "/images/select.webp",
    bg: "bg-[#DBF226]",
  },

  {
    name1: "Check",
    name2: "Company Status",
    image: "/images/status.webp",
    bg: "bg-[#F1F1E9]",
  },
];

const moreInfo = [
  {
    name: "How to register a company",
    href: "/register",
  },

  {
    name: "How to check a company status",
    href: "/status",
  },

  {
    name: "How to register as an investor",
    href: "/select",
  },

  {
    name: "How to select a company to invest in",
    href: "/select",
  },
];

const About = () => {
  return (
    <main className="pt-11">
      <div className="max-w-[1300px] w-full mx-auto mb-1 px-2 md:px-9  ">
        <h1 className="mb-7">About Us</h1>
        <p className="text-[20px] text-primary mb-10">
          ZimStartUp is a platform that showcases mainly startups, SMEs’,youth
          ideas and connects them with various people in different
          communities.,allows you to register and list your entity on the
          website. It enablescompanies to list their stock exchange capital and
          attract investors, lenders,customers, and partners from various
          communities. It also allows communities toaccess information,
          documents, and ratings of the companies and participate intheir growth
          and success. It’s an easy-to-use platform that can be used byusers
          with minimum computer skills. Its free and can be accessed with/
          withoutthe internet.
        </p>

        <div className="md:py-[90px]  grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-10">
          {actions.map((action, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center py-[50px] ${action.bg} rounded-2xl`}>
              <div className="w-[60px]  relative mb-2">
                <Image
                  src={action.image}
                  width={100}
                  height={100}
                  alt="action"
                />
              </div>

              <h4 className=" text-[22px] text-center  mt-5">
                {action.name1} <br /> {action.name2}
              </h4>
            </div>
          ))}
        </div>

        <h1>Get more information</h1>

        <div className="grid md:grid-cols-2 mb-20">
          <div>
            {moreInfo.map((info, index) => (
              <div
                key={index}
                className="w-[400px] flex items-center p-3 border-b">
                <h4 className="text-[18px] text-primary mr-3">{index + 1}.</h4>
                <Link
                  key={index}
                  href={info.href}
                  className="block text-[20px] text-primary">
                  {info.name}
                </Link>
              </div>
            ))}
          </div>

          <div className="flex items-center">
            <div className="flex-[1.2] h-[240px] relative flex flex-col bg-[#F1F1E9] justify-between p-4 pr-11 rounded-2xl ">
              <div className="relative overflow-hidden">
                <Image
                  src="/images/growing_chart.webp"
                  width={278}
                  height={219}
                  style={{ width: "100%", height: "auto" }}
                  alt="phone"
                />
              </div>
            </div>

            <div className="flex-[1] relative h-[200px] -ml-7 flex flex-col bg-primary justify-between p-7 rounded-2xl ">
              <div className="mt-5">
                <p className="text-[12px] text-[#DBF226] leading-tight">
                  Main Balance
                </p>
                <h3 className="text-[#DBF226] leading-tight">$2000.00</h3>
              </div>

              <div className="flex justify-between items-center ">
                <div>
                  <p className="text-[8px] text-[#DBF226] leading-none">
                    Valid to
                  </p>
                  <h6 className="text-[10px] text-[#DBF226]">12/12/2025</h6>
                </div>

                <div>
                  <p className="text-[8px] text-[#DBF226] leading-none">
                    Acc Holder
                  </p>
                  <h6 className="text-[10px] text-[#DBF226]">John Doe</h6>
                </div>

                <div className="w-7 h-7 rounded-full bg-[#DBF226] opacity-50 " />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F1F1E9]  py-[40px] px-[40px] ">
        <div className="max-w-[1300px] w-full mx-auto">
          <form className="max-w-[1000px] w-full">
            <h1 className="mb-5">Have a Questions</h1>

            <TextField
              placeholder="Enter your name"
              className="border-[#AFAFAF] border-2 "
            />

            <TextField
              placeholder="Enter your email"
              type="email"
              className="border-[#AFAFAF] border-2 "
            />

            <TextArea
              placeholder="Type your question here"
              className="border-[#AFAFAF] border-2  mt-5"
            />

            <div className="flex justify-end">
              <button className="w-[150px] bg-primary font-semibold text-white   py-[14px] rounded-md mt-5">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default About;
