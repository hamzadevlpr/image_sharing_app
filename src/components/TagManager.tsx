
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, X, Plus } from 'lucide-react';

interface TagManagerProps {
    tags: string[];
    onChange: (tags: string[]) => void;
    maxTags?: number;
    sampleTags?: string[];
}

const TagManager: React.FC<TagManagerProps> = ({
    tags,
    onChange,
    maxTags = 10,
    sampleTags = ['photography', 'sunset', 'landscape', 'beautiful', 'nature']
}) => {
    const [currentTag, setCurrentTag] = useState('');

    const addTag = () => {
        const trimmedTag = currentTag.trim().toLowerCase();
        if (trimmedTag && !tags.includes(trimmedTag) && tags.length < maxTags) {
            onChange([...tags, trimmedTag]);
            setCurrentTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        onChange(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    const addSampleTag = (tag: string) => {
        if (!tags.includes(tag) && tags.length < maxTags) {
            onChange([...tags, tag]);
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <Label htmlFor="tags" className="text-sm font-medium text-slate-700">
                    Tags
                </Label>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-slate-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add keywords to make your image easier to find</p>
                    </TooltipContent>
                </Tooltip>
            </div>

            <div className="flex gap-2">
                <Input
                    id="tags"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a tag and press Enter"
                    className="transition-all duration-200 border-slate-300 hover:border-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    disabled={tags.length >= maxTags}
                />
                <Button
                    type="button"
                    variant="primary"
                    onClick={addTag}
                    disabled={!currentTag.trim() || tags.length >= maxTags}
                    size="sm"
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            {/* Current Tags */}
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <Badge
                            key={index}
                            variant="secondary"
                            className="bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 transition-colors duration-200 flex items-center gap-1 px-3 py-1"
                        >
                            {tag}
                            <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-1 hover:bg-teal-200 rounded-full p-0.5 transition-colors duration-200"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}

            {/* Sample Tags */}
            {tags.length < maxTags && (
                <div className="space-y-2">
                    <span className="text-xs text-slate-500">Suggested tags:</span>
                    <div className="flex flex-wrap gap-2">
                        {sampleTags.filter(tag => !tags.includes(tag)).slice(0, 5).map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => addSampleTag(tag)}
                                className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 transition-colors duration-200 border border-slate-200"
                            >
                                + {tag}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <span className="text-xs text-slate-500">
                {tags.length}/{maxTags} tags added
            </span>
        </div>
    );
};

export default TagManager;