import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../state/store";
import {
  addCompanyDocument,
  submitUploadCompanyLogo,
  uploadCompanyLogo,
} from "@/state/slices/companySlice";
import { toast } from "react-toastify";

const UploadCompanyDialog: React.FC = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const { combinedCompanyData, status } = useSelector(
    (state: any) => state.company,
  );

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Handle file upload logic here
      console.log("Uploading file:", selectedFile);
      try {
        // const formData = new FormData();
        // formData.append("file", selectedFile);
        const response = dispatch(
          submitUploadCompanyLogo({
            companyId: combinedCompanyData.company_data.company_id,
            file: selectedFile,
          }),
        );

        if (response) {
          console.log(response);
          toast.success("Company document added successful", {
            position: "bottom-center",
          });
        }

        //
      } catch (error) {
        console.log("Error:", error);
        toast.error("Failed to add company document", {
          position: "bottom-center",
        });
      }

      closeDialog();
    }
  };

  return (
    <>
      <button
        onClick={openDialog}
        className="absolute bottom-0 right-0 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
          />
        </svg>
      </button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10"
        onClose={closeDialog}
      >
        <div className="fixed inset-0 bg-black bg-opacity-30" />
        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
            <DialogTitle
              as="h3"
              className="text-center text-lg font-medium text-gray-800"
            >
              Upload Company Logo
            </DialogTitle>

            <div className="mt-4 flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5v-12m0 0-3 3m3-3 3 3M6.75 12.75v4.5a2.25 2.25 0 0 0 2.25 2.25h6a2.25 2.25 0 0 0 2.25-2.25v-4.5"
                  />
                </svg>
              </div>

              <label
                htmlFor="file-upload"
                className="mt-4 cursor-pointer rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
              >
                Select Image
                <input
                  id="file-upload"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>

              {selectedFile && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected File: {selectedFile.name}
                </p>
              )}
            </div>

            <div className="mt-6 flex justify-center gap-2">
              <button
                onClick={closeDialog}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!selectedFile}
                className={`rounded-md bg-blue-500 px-4 py-2 text-sm text-white ${
                  !selectedFile
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-blue-600"
                }`}
              >
                Upload
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default UploadCompanyDialog;
