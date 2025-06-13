import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { X, Plus } from 'lucide-react';
import { useUpload } from '@/components/UploadProvider';

const MetadataForm: React.FC = () => {
  const { metadata, setMetadata } = useUpload();
  const [tagInput, setTagInput] = React.useState('');

  const handleAddTag = () => {
    if (tagInput.trim() && !metadata.tags.includes(tagInput.trim())) {
      setMetadata({
        ...metadata,
        tags: [...metadata.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setMetadata({
      ...metadata,
      tags: metadata.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200">
      <h3 className="text-lg font-medium text-slate-800 mb-4">Image Details</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-sm font-medium text-slate-700 mb-2 block">
            Image Title *
          </Label>
          <Input
            id="title"
            placeholder="Enter a descriptive title"
            value={metadata.title}
            onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
            className="rounded-lg border-slate-200 focus:border-blue-300 focus:ring-blue-200"
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-sm font-medium text-slate-700 mb-2 block">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Describe your image (optional)"
            rows={3}
            value={metadata.description}
            onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
            className="rounded-lg border-slate-200 focus:border-blue-300 focus:ring-blue-200 resize-none"
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-slate-700 mb-2 block">
            Tags
          </Label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Add tags (e.g., nature, photography)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleTagInputKeyPress}
              className="flex-1 rounded-lg border-slate-200 focus:border-blue-300 focus:ring-blue-200"
            />
            <button
              onClick={handleAddTag}
              disabled={!tagInput.trim()}
              className="px-3 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          {metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {metadata.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-blue-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetadataForm;