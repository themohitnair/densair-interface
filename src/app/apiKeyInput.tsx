import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ApiKeyInputProps {
    apiKey: string
    onApiKeyChange: (value: string) => void
}

export function ApiKeyInput({ apiKey, onApiKeyChange }: ApiKeyInputProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor="api-key" className="text-sm font-medium text-gray-300">API Key</Label>
            <Input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => onApiKeyChange(e.target.value)}
                className="bg-secondary text-secondary-foreground border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your API key"
            />
        </div>
    )
}