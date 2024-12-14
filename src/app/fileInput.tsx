'use client'

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, File } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface FileInputProps {
    onChange: (file: File | null) => void
}

export function FileInput({ onChange }: FileInputProps) {
    const [file, setFile] = useState<File | null>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setFile(acceptedFiles[0])
            onChange(acceptedFiles[0])
        }
    }, [onChange])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf']
        },
        multiple: false
    })

    return (
        <div 
            {...getRootProps()} 
            className={`p-6 border-2 rounded-lg transition-colors duration-300 ease-in-out ${
                isDragActive ? 'border-primary bg-black' : 'border-gray-600 hover:border-primary/50'
            }`}
        >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center text-center">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-lg font-semibold text-gray-300 mb-2">
                    {file ? file.name : 'Drag & drop your PDF here'}
                </p>
                <p className="text-sm text-gray-400 mb-4">
                    {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'or'}
                </p>
                <Button 
                    type="button" 
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    <File className="w-4 h-4 mr-2" />
                    Browse PDF
                </Button>
            </div>
        </div>
    )
}