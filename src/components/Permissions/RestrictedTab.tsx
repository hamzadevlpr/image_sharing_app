import React from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface RestrictedTabProps {
    allowedEmails: string[];
    setAllowedEmails: (emails: string[]) => void;
    allowLinkAccess: boolean;
    setAllowLinkAccess: (value: boolean) => void;
}
export default function RestrictedTab({ allowedEmails, setAllowedEmails, allowLinkAccess, setAllowLinkAccess }: RestrictedTabProps) {
    const [currentEmail, setCurrentEmail] = React.useState("");

    const handleAddEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && currentEmail.trim()) {
            e.preventDefault();
            if (!allowedEmails.includes(currentEmail.trim())) {
                setAllowedEmails([...allowedEmails, currentEmail.trim()]);
            }
            setCurrentEmail("");
        }
    };

    const removeEmail = (email: string) => {
        setAllowedEmails(allowedEmails.filter(e => e !== email));
    };
    return (
        <div className="mt-4 space-y-4">
            <div>
                <Label htmlFor="emails" className="text-foreground font-medium">Allowed Users (Emails)</Label>
                <Input
                    id="emails"
                    placeholder="Type an email and press Enter"
                    value={currentEmail}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    onKeyDown={handleAddEmail}
                    className="mt-2 h-10"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                    {allowedEmails.map(email => (
                        <span key={email} className="bg-teal-100 text-teal-800 px-2 py-1 rounded flex items-center">
                            {email}
                            <button onClick={() => removeEmail(email)} className="ml-1 text-red-500 hover:text-red-700">×</button>
                        </span>
                    ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Only these emails can access after login.</p>
            </div>

            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    id="secretLink"
                    checked={allowLinkAccess}
                    onChange={(e) => setAllowLinkAccess(e.target.checked)}
                    className="accent-teal-600"
                />
                <Label htmlFor="secretLink">Allow access via secret link</Label>
            </div>
            {allowLinkAccess && (
                <p className="text-xs text-muted-foreground">Anyone with the link can access, but it's not listed publicly.</p>
            )}
        </div>
    )
}
