import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PageRangeInputProps {
    fromPage: number
    toPage: number
    onFromPageChange: (value: number) => void
    onToPageChange: (value: number) => void
}

export function PageRangeInput({ fromPage, toPage, onFromPageChange, onToPageChange }: PageRangeInputProps) {
    return (
        <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
                <Label htmlFor="from-page" className="text-sm font-medium text-gray-300">From Page</Label>
                <Input
                    id="from-page"
                    type="number"
                    min={1}
                    value={fromPage}
                    onChange={(e) => onFromPageChange(parseInt(e.target.value))}
                    className="bg-secondary text-secondary-foreground border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
            </div>
            <div className="flex-1 space-y-2">
                <Label htmlFor="to-page" className="text-sm font-medium text-gray-300">To Page</Label>
                <Input
                    id="to-page"
                    type="number"
                    min={1}
                    value={toPage}
                    onChange={(e) => onToPageChange(parseInt(e.target.value))}
                    className="bg-secondary text-secondary-foreground border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
            </div>
        </div>
    )
}