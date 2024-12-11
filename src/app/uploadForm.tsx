"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApiKeyInput } from "./apiKeyInput"
import { ModelSelector } from "./modelSelector"
import { PaymentDialog } from "./paymentDialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileInput } from "./fileInput"
import { PageRangeInput } from "./pageRangeInput"
import { ConvertButton } from "./convertButton"
import { DownloadDialog } from "./downloadDialog"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/hooks/use-toast"


export default function UploadForm() {
    const [file, setFile] = useState<File | null>(null)
    const [fromPage, setFromPage] = useState<number>(1)
    const [toPage, setToPage] = useState<number>(1)
    const [isLoading, setIsLoading] = useState(false)
    const [showDownloadDialog, setShowDownloadDialog] = useState(false)
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
    const [apiKey, setApiKey] = useState<string>("")
    const [selectedModel, setSelectedModel] = useState<string>("gpt-3.5-turbo")
    const [showPaymentDialog, setShowPaymentDialog] = useState(false)
    const [estimatedTokens, setEstimatedTokens] = useState<number>(0)

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

    const estimateTokens = () => {
        // Implement token estimation logic here
        // This is a placeholder calculation
        if (file) {
            const estimatedTokens = Math.round(file.size / 100) // Rough estimate
            setEstimatedTokens(estimatedTokens)
            return estimatedTokens
        }
        return 0
    }

    const handleConvert = (useOwnApiKey: boolean) => {
        if (useOwnApiKey) {
            if (!apiKey) {
                toast({
                    title: "Error",
                    description: "Please enter your API key.",
                    variant: "destructive",
                })
                return
            }
            handleSubmit()
        } else {
            const tokens = estimateTokens()
            if (tokens > 0) {
                setShowPaymentDialog(true)
            } else {
                toast({
                    title: "Error",
                    description: "Please upload a file first.",
                    variant: "destructive",
                })
            }
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
                        <Tabs defaultValue="app-key" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="app-key">Use App API Key</TabsTrigger>
                                <TabsTrigger value="own-key">Use Your Own API Key</TabsTrigger>
                            </TabsList>
                            <TabsContent value="app-key">
                                <p className="text-sm text-gray-400 mb-4">We will use our API key. You will be charged based on usage.</p>
                                <ConvertButton onClick={() => handleConvert(false)} isLoading={isLoading} />
                            </TabsContent>
                            <TabsContent value="own-key">
                                <div className="space-y-4">
                                    <ApiKeyInput apiKey={apiKey} onApiKeyChange={setApiKey} />
                                    <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />
                                    <ConvertButton onClick={() => handleConvert(true)} isLoading={isLoading} />
                                </div>
                            </TabsContent>
                        </Tabs>
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
            {showPaymentDialog && (
                <PaymentDialog
                    onClose={() => setShowPaymentDialog(false)}
                    onPaymentComplete={handleSubmit}
                    estimatedTokens={estimatedTokens}
                />
            )}
        </>
    )
}