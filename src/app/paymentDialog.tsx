"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from 'lucide-react'

interface PaymentDialogProps {
    onClose: () => void
    onPaymentComplete: () => void
    estimatedTokens: number
}

export function PaymentDialog({ onClose, onPaymentComplete, estimatedTokens }: PaymentDialogProps) {
    const [cardNumber, setCardNumber] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [cvv, setCvv] = useState("")

    const handlePayment = () => {
        // Implement payment processing logic here
        // For now, we'll just simulate a successful payment
        setTimeout(() => {
            onPaymentComplete()
            onClose()
        }, 2000)
    }

    const estimatedCost = (estimatedTokens / 1000 * 0.002).toFixed(2) // Assuming $0.002 per 1K tokens

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md bg-card border-gray-800 shadow-lg">
                <CardHeader className="border-b border-gray-800 flex justify-between items-center">
                    <CardTitle className="text-2xl font-bold text-white">Payment Required</CardTitle>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                    <p className="text-gray-300">Estimated tokens: {estimatedTokens}</p>
                    <p className="text-gray-300">Estimated cost: ${estimatedCost}</p>
                    <div className="space-y-2">
                        <Label htmlFor="card-number" className="text-sm font-medium text-gray-300">Card Number</Label>
                        <Input
                            id="card-number"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="bg-secondary text-secondary-foreground border-gray-700"
                            placeholder="1234 5678 9012 3456"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex-1 space-y-2">
                            <Label htmlFor="expiry-date" className="text-sm font-medium text-gray-300">Expiry Date</Label>
                            <Input
                                id="expiry-date"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                className="bg-secondary text-secondary-foreground border-gray-700"
                                placeholder="MM/YY"
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <Label htmlFor="cvv" className="text-sm font-medium text-gray-300">CVV</Label>
                            <Input
                                id="cvv"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                className="bg-secondary text-secondary-foreground border-gray-700"
                                placeholder="123"
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="border-t border-gray-800 pt-6">
                    <Button onClick={handlePayment} className="w-full bg-primary text-primary-foreground">
                        Pay and Process
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}