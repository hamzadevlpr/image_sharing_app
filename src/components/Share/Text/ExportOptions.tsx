import { Button } from '@/components/ui/button';
import { FileText, FileDown } from 'lucide-react';
import React from 'react';

export default function ExportOptions({ content }: { content: string }) {
    const handleDownload = () => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'shared-text.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="grid grid-cols-1 gap-3">
            <Button
                variant="outline"
                size="sm"
                className="border border-gray-200 bg-white hover:bg-teal-50 justify-start transition"
                onClick={handleDownload}
                aria-label="Save as text file"
            >
                <FileText className="h-4 w-4 text-teal-600 mr-2" />
                Save as TXT
            </Button>

            <Button
                variant="outline"
                size="sm"
                className="border border-gray-200 bg-white justify-start opacity-60 cursor-not-allowed"
                disabled
                aria-label="PDF export disabled"
            >
                <FileDown className="h-4 w-4 text-gray-400 mr-2" />
                Export PDF <span className="ml-auto text-xs text-gray-400">(Coming soon)</span>
            </Button>
        </div>
    );
}
