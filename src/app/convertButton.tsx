import { Button } from "@/components/ui/button"
import { FileUp } from 'lucide-react'

interface ConvertButtonProps {
    onClick: () => void
    isLoading: boolean
}

export function ConvertButton({ onClick, isLoading }: ConvertButtonProps) {
    return (
        <Button 
            type="submit" 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-2 px-4 rounded-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
            onClick={onClick}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Estimating...
                </>
            ) : (
                <>
                    <FileUp className="w-5 h-5 mr-2" />
                    Estimate & Pay
                </>
            )}
        </Button>
    )
}