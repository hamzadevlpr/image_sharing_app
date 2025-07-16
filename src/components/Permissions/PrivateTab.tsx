import React, { useState, useEffect } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Info } from 'lucide-react';

interface PrivateTabProps {
    password: string;
    setPassword: (password: string) => void;
}

export default function PrivateTab({ password, setPassword }: PrivateTabProps) {
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        // Hide error when user starts typing
        if (password.trim()) {
            setShowError(false);
        }
    }, [password]);

    const handleBlur = () => {
        if (!password.trim()) {
            setShowError(true);
        }
    };

    return (
        <TooltipProvider>
            <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                    <Label htmlFor="password" className="text-foreground font-medium">
                        Set Password <span className="text-red-500">*</span>
                    </Label>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-slate-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                            Set a password to restrict access to this image. Only people with the password can view it.
                        </TooltipContent>
                    </Tooltip>
                </div>
                <Input
                    id="password"
                    type="password"
                    placeholder="Enter a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={handleBlur}
                    className={`h-10 transition-all duration-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent ${showError ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 hover:border-slate-400'
                        }`}
                />
                {showError ? (
                    <p className="text-xs text-red-500">Password is required for private images.</p>
                ) : (
                    <p className="text-xs text-muted-foreground">
                        Only people with the password can access this image.
                    </p>
                )}
            </div>
        </TooltipProvider>
    );
}
