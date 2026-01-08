"use client"

import type React from "react"
import { useState } from "react"
import { FileText, Upload, Plus, Download, Trash2, File, FolderOpen } from "lucide-react"
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

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    const iconClass = "h-12 w-12"
    
    switch (extension) {
      case 'pdf':
        return <FileText className={`${iconClass} text-red-500`} />
      case 'doc':
      case 'docx':
        return <FileText className={`${iconClass} text-blue-500`} />
      case 'xls':
      case 'xlsx':
        return <FileText className={`${iconClass} text-green-500`} />
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <File className={`${iconClass} text-purple-500`} />
      default:
        return <File className={`${iconClass} text-gray-500`} />
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="rounded-3xl border-none bg-white p-8">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Company Documents</h3>
          <p className="mt-1 text-sm text-gray-500">{documents.length} document{documents.length !== 1 ? 's' : ''} available</p>
        </div>
        <label className="cursor-pointer">
          <CustomButton 
            type="button" 
            variant="solid" 
            icon={<Plus className="h-4 w-4" />} 
            isDisabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Document"}
          </CustomButton>
          <input 
            type="file" 
            className="hidden" 
            onChange={handleFileChange} 
            disabled={uploading} 
          />
        </label>
      </div>

      {/* Upload Zone */}
      <div
        className={`mb-8 flex h-48 flex-col items-center justify-center rounded-2xl border-2 transition-all ${
          isDragging 
            ? "border-primary bg-primary/5" 
            : "border-dashed border-gray-300 bg-gray-50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className={`mx-auto h-12 w-12 ${isDragging ? 'text-primary' : 'text-gray-400'}`} />
        <p className="mt-3 text-base font-medium text-gray-700">Drag and drop files here</p>
        <p className="mt-1 text-sm text-gray-500">or click the button above to browse</p>
        <p className="mt-2 text-xs text-gray-400">Supported: PDF, DOCX, XLSX, JPG, PNG</p>
      </div>

      {/* Documents Grid */}
      {documents.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="group relative rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:border-primary hover:shadow-lg"
            >
              {/* File Icon */}
              <div className="mb-4 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gray-50 group-hover:bg-primary/5 transition-colors">
                  {getFileIcon(doc.document_name)}
                </div>
              </div>

              {/* File Name */}
              <h4 className="mb-2 line-clamp-2 text-center text-sm font-semibold text-gray-900">
                {doc.document_name}
              </h4>

              {/* File Date */}
              {doc.created_at && (
                <p className="mb-4 text-center text-xs text-gray-500">
                  {formatDate(doc.created_at)}
                </p>
              )}

              {/* Actions */}
              <div className="flex items-center justify-center gap-2">
                <a
                  href={doc.company_doc}
                  download
                  className="flex items-center justify-center rounded-lg bg-primary/10 p-2 text-primary transition-colors hover:bg-primary hover:text-white"
                  title="Download"
                >
                  <Download className="h-4 w-4" />
                </a>
                {onDelete && (
                  <button
                    onClick={() => handleDeleteDocument(doc.id)}
                    className="flex items-center justify-center rounded-lg bg-red-50 p-2 text-red-600 transition-colors hover:bg-red-600 hover:text-white"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-12">
          <FolderOpen className="h-16 w-16 text-gray-400" />
          <p className="mt-4 text-lg font-medium text-gray-700">No documents yet</p>
          <p className="mt-2 text-sm text-gray-500">Upload your first document to get started</p>
        </div>
      )}
    </div>
  )
}
