'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { FileInput } from "./fileInput"
import { PageRangeInput } from "./pageRangeInput"
import { ConvertButton } from "./convertButton"
import { DownloadDialog } from "./downloadDialog"

export default function UploadForm() {
    const [file, setFile] = useState<File | null>(null)
    const [fromPage, setFromPage] = useState<number>(1)
    const [toPage, setToPage] = useState<number>(1)
    const [isLoading, setIsLoading] = useState(false)
    const [showDownloadDialog, setShowDownloadDialog] = useState(false)
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

    const handleSubmit = async () => {
        if (!file) {
            toast({
                title: "Error",
                description: "Please select a PDF file.",
                variant: "destructive",
            })
            return
        }

        setIsLoading(true)

        const formData = new FormData()
        formData.append('file', file)
        formData.append('fromPage', fromPage.toString())
        formData.append('toPage', toPage.toString())

        try {
            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                const blob = await response.blob()
                const url = window.URL.createObjectURL(blob)
                setDownloadUrl(url)
                setShowDownloadDialog(true)
                toast({
                    title: "Success",
                    description: "Your summarized PPTX is ready for download.",
                })
            } else {
                throw new Error('Conversion failed')
            }
        } catch (error) {
            toast({
                title: "Error",
                description: `Failed to summarize and convert PDF to PPTX. Please try again.\nbody: ${error}`,
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleDownload = () => {
        if (downloadUrl) {
            const a = document.createElement('a')
            a.href = downloadUrl
            a.download = 'DensAIr_Summary.pptx'
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(downloadUrl)
            setShowDownloadDialog(false)
            setDownloadUrl(null)
        }
    }

    return (
        <>
            <Card className="w-full max-w-md bg-card border-gray-800 shadow-lg">
                <CardHeader className="border-b border-gray-800">
                    <CardTitle className="text-2xl font-bold text-white">Summarize & Convert PDF</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
                        <FileInput onChange={setFile} />
                        <PageRangeInput
                            fromPage={fromPage}
                            toPage={toPage}
                            onFromPageChange={setFromPage}
                            onToPageChange={setToPage}
                        />
                    </form>
                </CardContent>
                <CardFooter className="border-t border-gray-800 pt-6">
                    <ConvertButton onClick={handleSubmit} isLoading={isLoading} />
                </CardFooter>
            </Card>
            <Toaster />
            {showDownloadDialog && (
                <DownloadDialog
                    onClose={() => setShowDownloadDialog(false)}
                    onDownload={handleDownload}
                    fileName="DensAIr_Summary.pptx"
                />
            )}
        </>
    )
}