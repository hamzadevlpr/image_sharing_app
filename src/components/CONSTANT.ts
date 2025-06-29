
import { Globe, KeyRound, Users } from "lucide-react";
export const permissions = [
    {
        value: "public" as const,
        label: "Public",
        description: "Anyone can view this image",
        icon: Globe,
        color: "text-teal-600",
        bg: "hover:bg-teal-50",
    },
    {
        value: "restricted" as const,
        label: "Restricted",
        description: "Only invited users or link holders can access",
        icon: Users,
        color: "text-blue-600",
        bg: "hover:bg-blue-50",
    },
    {
        value: "private" as const,
        label: "Private (Password Protected)",
        description: "Only accessible with password",
        icon: KeyRound,
        color: "text-yellow-600",
        bg: "hover:bg-yellow-50",
    },
];