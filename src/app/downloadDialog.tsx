import React from 'react'
import { X, Download, FileType } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface DownloadDialogProps {
    onClose: () => void
    onDownload: () => void
    fileName: string
}

export function DownloadDialog({ onClose, onDownload, fileName }: DownloadDialogProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md bg-card border-gray-800 shadow-lg">
                <CardHeader className="relative border-b border-gray-800">
                    <CardTitle className="text-2xl font-bold text-white">Your PPTX is Ready!</CardTitle>
                    <Button 
                        className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-700"
                        onClick={onClose}
                        variant="ghost"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </Button>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="flex items-center justify-center space-x-4">
                        <FileType className="w-16 h-16 text-primary" />
                        <div>
                            <p className="text-lg font-semibold text-gray-300">{fileName}</p>
                            <p className="text-sm text-gray-400">Click the button below to download</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="border-t border-gray-800 pt-6">
                    <Button 
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-2 px-4 rounded-md transition-all duration-300 ease-in-out"
                        onClick={onDownload}
                    >
                        <Download className="w-5 h-5 mr-2" />
                        Download PPTX
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}