const DocumentsSection = ({ company }) => {
  return (<div className="m-2 md:m-4">
    <h5 className="mt-4 text-2xl font-bold text-primary text-center">Company Documents</h5>
    {Array.isArray(company.company_documents) && company.company_documents.length > 0 ? (
  <table className="w-full border-collapse border border-gray-300 mt-4 md:mt-10 text-sm md:text-base">
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-300 pl-10 text-start">Document Name</th>
        <th className="border border-gray-300 p-2 text-center">Created At</th>
        <th className="border border-gray-300 p-2 text-center">Action</th>
      </tr>
    </thead>
    <tbody>
      {company.company_documents.map((document) => (
        <tr key={document.id} className="text-center">
          <td className="border border-gray-300 p-1 md:pl-10 text-start text-sm md:text-lg">
            {document.document_name || "N/A"}
          </td>
          <td className="border border-gray-300 p-1 sm:p-2 text-sm md:text-lg">
            {document.created_at || "N/A"}
          </td>
          <td className="border border-gray-300 p-1 sm:p-2 text-sm md:text-lg">
            <a href={document.company_doc} target="_blank" rel="noopener noreferrer">
              <button className="w-full sm:w-auto font-bold text-[11px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[17px] h-8 sm:h-10 md:px-3 bg-primary text-white rounded-lg hover:border transition-all hover:bg-transparent hover:text-primary">
                View
              </button>
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p>No documents available.</p>
)}

  </div>
)};

export default DocumentsSection;