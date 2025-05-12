import Sidebar from "./Sidebar";

const SettingsLayout = ({ children }) => {
  return (
    <div className="flex  relative bg-[#fff] ">
      <Sidebar />

      <div className="flex-1 p-5  lg:px-10 overflow-y-auto fit-height">
        {children}
      </div>
    </div>
  );
};

export default SettingsLayout;
