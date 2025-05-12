import Stepper from "./Stepper";

const Layout = ({ children }) => {
  return (
    <div className="max-w-5xl relative w-full mx-auto px-5 ">
      <Stepper />
      <div className="py-9 md:py-10">{children}</div>
    </div>
  );
};

export default Layout;
