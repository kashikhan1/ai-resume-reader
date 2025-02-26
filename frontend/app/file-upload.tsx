"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Loader2 } from "lucide-react"

interface FileUploadProps {
  onFileUpload: (file: File) => void
  isUploading: boolean
}

export default function FileUpload({ onFileUpload, isUploading }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0])
    }
  }

  const onButtonClick = () => {
    inputRef.current?.click()
  }

  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg ${
        dragActive ? "border-primary" : "border-gray-300"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".pdf,.docx"
        onChange={handleChange}
        disabled={isUploading}
      />
      {isUploading ? (
        <Loader2 className="w-10 h-10 mb-3 text-primary animate-spin" />
      ) : (
        <Upload className="w-10 h-10 mb-3 text-gray-400" />
      )}
      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span> or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">PDF or DOCX (MAX. 5MB)</p>
      <Button type="button" onClick={onButtonClick} variant="outline" className="mt-4" disabled={isUploading}>
        {isUploading ? "Uploading..." : "Select File"}
      </Button>
    </div>
  )
}

