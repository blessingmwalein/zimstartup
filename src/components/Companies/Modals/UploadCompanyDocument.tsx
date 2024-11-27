import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../state/store";
import { addCompanyDocument } from "../../../../state/slices/companySlice";
import { toast } from "react-toastify";

const UploadDocumentDialog: React.FC = ({
   
}) => {
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
          addCompanyDocument({
            companyId: combinedCompanyData.company_data.company_id,
            file: selectedFile,
          }),
        );

        if (response) {
          toast.success("Company document added successful", {
            position: "bottom-center",
          });
          
        } else {
          toast.error("Something went wrong", {
            position: "bottom-center",
          });
        }

        //
      } catch (error) {}

      closeDialog();
    }
  };

  return (
    <>
      <button
        onClick={openDialog}
        className="absolute right-4 top-4 flex items-center gap-2 rounded-md border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
          />
        </svg>
        Upload Document
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
              Upload Document
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
                Select File
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf"
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

export default UploadDocumentDialog;
