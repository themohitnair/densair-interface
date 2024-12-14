"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileInput } from "./fileInput"
import { PageRangeInput } from "./pageRangeInput"
import { ConvertButton } from "./convertButton"
import { DownloadDialog } from "./downloadDialog"
import { PaymentDialog } from "./paymentDialog"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/hooks/use-toast"

interface EstimationResult {
    filename: string;
    size: number;
    pages: number;
    tokens: number;
    estimatedCost: number;
}

export default function UploadForm() {
    const [file, setFile] = useState<File | null>(null)
    const [fromPage, setFromPage] = useState<number>(1)
    const [toPage, setToPage] = useState<number>(1)
    const [isLoading, setIsLoading] = useState(false)
    const [showDownloadDialog, setShowDownloadDialog] = useState(false)
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
    const [showPaymentDialog, setShowPaymentDialog] = useState(false)
    const [estimationResult, setEstimationResult] = useState<EstimationResult | null>(null)

    const handleSubmit = async () => {
        setIsLoading(true)
        //Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setDownloadUrl("https://www.example.com/download")
        setShowDownloadDialog(true)
        setIsLoading(false)
    }

    const handleDownload = () => {
        if (downloadUrl) {
            window.open(downloadUrl, '_blank');
        }
        setShowDownloadDialog(false);
    }

    const estimateTokens = async () => {
        if (!file) {
            toast({
                title: "Error",
                description: "Please upload a file first.",
                variant: "destructive",
            })
            return
        }

        setIsLoading(true)

        const formData = new FormData()
        formData.append('file', file)

        const url = new URL('http://127.0.0.1:8000/estimate')
        url.searchParams.append('start_page', fromPage.toString())
        url.searchParams.append('end_page', toPage.toString())

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.detail || 'Estimation failed')
            }

            const result: EstimationResult = await response.json()
            setEstimationResult(result)
            return result
        } catch (error) {
            if (error instanceof Error) {
                toast({
                    title: "Error",
                    description: `Failed to estimate tokens: ${error.message}`,
                    variant: "destructive",
                })
            } else {
                toast({
                    title: "Error",
                    description: "An unknown error occurred during estimation.",
                    variant: "destructive",
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleConvert = async () => {
        const result = await estimateTokens()
        if (result) {
            const estimatedCost = result.tokens * 0.003
            setEstimationResult({...result, estimatedCost})
            setShowPaymentDialog(true)
        }
    }

    return (
        <>
            <Card className="w-full max-w-md bg-card border-gray-800 shadow-lg">
                <CardHeader className="border-b border-gray-800">
                    <CardTitle className="text-2xl font-bold text-white">Summarize & Convert PDF</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={(e) => { e.preventDefault(); }} className="space-y-6">
                        <FileInput onChange={setFile} />
                        <PageRangeInput
                            fromPage={fromPage}
                            toPage={toPage}
                            onFromPageChange={setFromPage}
                            onToPageChange={setToPage}
                        />
                        <p className="text-sm text-gray-400 mb-4">We will use our API key. You will be charged based on usage.</p>
                        <ConvertButton onClick={handleConvert} isLoading={isLoading} />
                    </form>
                </CardContent>
            </Card>
            <Toaster />
            {showDownloadDialog && (
                <DownloadDialog
                    onClose={() => setShowDownloadDialog(false)}
                    onDownload={handleDownload}
                    fileName="DensAIr_Summary.pptx"
                    downloadUrl={downloadUrl}
                />
            )}
            {showPaymentDialog && estimationResult && (
                <PaymentDialog
                    onClose={() => setShowPaymentDialog(false)}
                    onPaymentComplete={handleSubmit}
                    estimatedTokens={estimationResult.tokens}
                    estimatedCost={estimationResult.estimatedCost}
                />
            )}
        </>
    )
}