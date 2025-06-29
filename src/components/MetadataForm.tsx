import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { X, Plus, Info } from "lucide-react";
import { useUpload } from "@/components/UploadProvider";
import { Button } from "@/components/ui/button";
import TagManager from "./TagManager";

const MetadataForm: React.FC = () => {
  const { metadata, setMetadata } = useUpload();
  const [tagInput, setTagInput] = useState("");
  const [titleError, setTitleError] = useState("");

  const maxTitleLength = 100;
  const maxDescriptionLength = 300;
  const maxTags = 10;

  const categories = [
    "Nature",
    "Portrait",
    "Abstract",
    "Architecture",
    "Street",
    "Landscape",
    "Food",
    "Travel",
    "Fashion",
    "Sports",
    "Other",
  ];

  const sampleTags = [
    "photography",
    "sunset",
    "landscape",
    "beautiful",
    "nature",
  ];

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (
      trimmedTag &&
      !metadata.tags.includes(trimmedTag) &&
      metadata.tags.length < maxTags
    ) {
      setMetadata({ ...metadata, tags: [...metadata.tags, trimmedTag] });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setMetadata({
      ...metadata,
      tags: metadata.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const addSampleTag = (tag: string) => {
    if (!metadata.tags.includes(tag) && metadata.tags.length < maxTags) {
      setMetadata({ ...metadata, tags: [...metadata.tags, tag] });
    }
  };

  return (
    <TooltipProvider>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-slate-200">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Image Details
          </h2>
          <p className="text-slate-600">
            Add metadata to help organize and discover your image
          </p>
        </div>

        <div className="space-y-6">
          {/* Title Field */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="title" className="text-sm font-medium text-slate-700">
                Image Title <span className="text-red-500">*</span>
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-slate-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  Give your image a descriptive title that captures its essence. Required for upload.
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="title"
              value={metadata.title}
              onChange={(e) =>
                setMetadata({ ...metadata, title: e.target.value })
              }
              placeholder="e.g., Golden Hour at Mountain Peak"
              maxLength={100}
              className={`transition-all duration-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent ${!metadata.title.trim() ? "border-red-500" : "border-slate-300 hover:border-slate-400"
                }`}
            />
            <div className="flex justify-between items-center">
              <span
                className={`text-xs ${!metadata.title.trim() ? "text-red-500" : "text-slate-500"
                  }`}
              >
                {metadata.title.trim()
                  ? "Give your image a memorable title"
                  : "Title is required"}
              </span>
              <span
                className={`text-xs ${metadata.title.length > 90
                    ? "text-orange-500"
                    : "text-slate-400"
                  }`}
              >
                {metadata.title.length}/100
              </span>
            </div>
          </div>

          {/* Category Field */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label
                htmlFor="category"
                className="text-sm font-medium text-slate-700"
              >
                Category
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-slate-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Choose the category that best describes your image</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select
              value={metadata.category}
              onValueChange={(value) =>
                setMetadata({ ...metadata, category: value })
              }
            >
              <SelectTrigger className="w-full transition-all duration-200 hover:border-slate-400 focus:ring-2 focus:ring-teal-500">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-slate-200 shadow-lg">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-xs text-slate-500">
              Optional - helps with organization and discovery
            </span>
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label
                htmlFor="description"
                className="text-sm font-medium text-slate-700"
              >
                Description
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-slate-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Describe what makes this image special or tell its story
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Textarea
              id="description"
              placeholder="Share the story behind this image..."
              rows={3}
              maxLength={maxDescriptionLength}
              value={metadata.description}
              onChange={(e) =>
                setMetadata({ ...metadata, description: e.target.value })
              }
              className="resize-none transition-all duration-200 border-slate-300 hover:border-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500">
                Optional - add context to your image
              </span>
              <span
                className={`text-xs ${metadata.description.length > maxDescriptionLength * 0.9
                  ? "text-orange-500"
                  : "text-slate-400"
                  }`}
              >
                {metadata.description.length}/{maxDescriptionLength}
              </span>
            </div>
          </div>

          {/* Tags Field */}
          <TagManager
            tags={metadata.tags}
            onChange={(tags) => setMetadata({ ...metadata, tags })}
          />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MetadataForm;
