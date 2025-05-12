import MyDialog from "@/components/material/Dialog/MyDialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

const UserCompaniesDialogue = ({ open, onClose, competitionId, competition_description }) => {
  const router = useRouter();

  const { companies } = useSelector((state) => state.user);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    if (!loading) {
      if (competitionId && selected) {
        setLoading(true);
        router.push(`/competitions/${competitionId}?id=${selected.company_id}`);
      } else {
        alert("Please select a company before continuing.");
      }
    }
  };

  return (
    <MyDialog
      open={open}
      extended={true}
      _onClose={onClose}
      className='my-dialog'
      width={1200}
      height={720}>
      <div className="py-2 flex-col justify-center h-full container">
        <div className="mb-10">
          <h5 className="flex justify-center align-middle">COMPETITION DESCRIPTION</h5>
          <p className="mt-4">{competition_description}</p>
        </div>
        <p className="mt-[-16px] mb-[30px] font-bold">Which company would you like to join the competition with?</p>
        <div
          className="overflow-y-auto"
        >
          {companies?.map((company, key) => (
            <div
              key={key}
              onClick={() => setSelected(company)}
              className="my-2 flex flex-col gap-1">
              <p
                className={`py-2 px-2 rounded-lg cursor-pointer text-zinc-400 transition-colors duration-200 ${
                  selected === company
                    ? "bg-[#D6D58E] w-fit font-bold text-[#000]"
                    : "hover:underline hover:font-bold hover:text-black"
                }`}>
                {company.company_name}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12 justify-end">
          <button
            onClick={handleContinue}
            className="w-fit py-2 px-4 justify-center bg-primary font-semibold text-md text-white rounded-md hover:bg-primary-dark transition-colors duration-200">
            {loading ? "Loading..." : "Continue"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .my-dialog {
          width: 90%;
        }
        .container {
          padding: 16px;
          max-height: 700px;
          overflow-y: auto;
        }
        .container::-webkit-scrollbar {
          width: 8px;
        }
        .container::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 4px;
        }
        .container::-webkit-scrollbar-thumb:hover {
          background-color: #9ca3af;
        }
      `}</style>

    </MyDialog>
  );
};

export default UserCompaniesDialogue;
