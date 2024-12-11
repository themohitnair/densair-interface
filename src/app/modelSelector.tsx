import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface ModelSelectorProps {
    selectedModel: string
    onModelChange: (value: string) => void
}

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor="model" className="text-sm font-medium text-gray-300">Model</Label>
            <Select value={selectedModel} onValueChange={onModelChange}>
                <SelectTrigger id="model" className="bg-secondary text-secondary-foreground border-gray-700">
                    <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                    <SelectItem value="claude-v1">Claude v1</SelectItem>
                    <SelectItem value="claude-instant-v1">Claude Instant v1</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}