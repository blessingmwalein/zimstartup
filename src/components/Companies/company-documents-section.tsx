"use client"

import type React from "react"

import { useState } from "react"
import { FileText, Upload, Plus, Download, Trash2 } from "lucide-react"
import CustomButton from "./ui/custom-button"

interface CompanyDocumentsSectionProps {
  documents: any[]
  onUpload: (file: File) => Promise<any>
  onDelete?: (documentId: number) => Promise<any>
}

export default function CompanyDocumentsSection({ documents = [], onUpload, onDelete }: CompanyDocumentsSectionProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await handleFileUpload(e.target.files[0])
    }
  }

  const handleFileUpload = async (file: File) => {
    setUploading(true)
    try {
      await onUpload(file)
    } catch (error) {
      console.error("Error uploading file:", error)
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteDocument = async (documentId: number) => {
    if (onDelete) {
      try {
        await onDelete(documentId)
      } catch (error) {
        console.error("Error deleting document:", error)
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Company Documents</h3>
        <label>
          <CustomButton type="button" variant="solid" icon={<Plus className="h-4 w-4" />} isDisabled={uploading}>
            {uploading ? "Uploading..." : "Upload Document"}
          </CustomButton>
          <input type="file" className="hidden" onChange={handleFileChange} disabled={uploading} />
        </label>
      </div>

      <div
        className={`flex h-60 flex-col items-center justify-center rounded-lg border-2 ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-dashed"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center text-gray-500">
          <Upload className="mx-auto h-10 w-10" />
          <p className="mt-2">Drag and drop files here, or click to browse</p>
          <p className="mt-1 text-sm">Supported formats: PDF, DOCX, XLSX, JPG, PNG</p>
          <label>
            <CustomButton
              type="button"
              variant="outlined"
              icon={<FileText className="h-4 w-4" />}
              borderRadius="rounded-md"
              fullWidth={false}
              isDisabled={uploading}
            >
              Browse Files
            </CustomButton>
            <input type="file" className="hidden" onChange={handleFileChange} disabled={uploading} />
          </label>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="mb-4 font-medium">Recent Documents</h4>
        {documents.length === 0 ? (
          <div className="rounded-lg border border-gray-200 p-8 text-center text-gray-500">
            <p>No documents uploaded yet</p>
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200">
            {documents.map((document, index) => (
              <div
                key={document.document_id || index}
                className={`flex items-center justify-between ${
                  index !== documents.length - 1 ? "border-b border-gray-200" : ""
                } p-4`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{document.document_name || `Document ${index + 1}`}</p>
                    <p className="text-sm text-gray-500">
                      Uploaded on {document.upload_date ? formatDate(document.upload_date) : "Unknown date"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href={document.document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-2 text-[#001f3f] hover:bg-gray-100"
                  >
                    <Download className="h-5 w-5" />
                  </a>
                  {onDelete && (
                    <button
                      onClick={() => handleDeleteDocument(document.document_id)}
                      className="rounded-full p-2 text-red-500 hover:bg-gray-100"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
