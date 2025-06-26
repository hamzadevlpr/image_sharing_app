import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Globe, Lock, KeyRound, Users } from "lucide-react";
import { useUpload } from "@/components/UploadProvider";
import { Input } from "./ui/input";

const PermissionSelector: React.FC = () => {
  const { permission, setPermission, password, setPassword } = useUpload();

  const permissions = [
    {
      value: "public" as const,
      label: "Public",
      description: "Anyone can view this image",
      icon: Globe,
      color: "text-green-600",
      bg: "hover:bg-green-50",
    },
    {
      value: "restricted" as const,
      label: "Restricted",
      description: "Share with specific users or via link",
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

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-4 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-2">
        Sharing Permissions
      </h3>
      <p className="text-slate-600 text-sm mb-4">
        Choose how you want to control access to this image.
      </p>

      <RadioGroup
        value={permission}
        onValueChange={(value: "public" | "private" | "restricted") =>
          setPermission(value)
        }
        className="space-y-3"
      >
        {permissions.map((perm) => {
          const Icon = perm.icon;
          const isSelected = permission === perm.value;

          return (
            <div
              key={perm.value}
              className={`flex items-start space-x-3 p-3 rounded-xl border ${
                isSelected
                  ? "border-teal-600 bg-teal-50/20"
                  : "border-slate-200"
              } transition-all duration-200 cursor-pointer group ${perm.bg}`}
              onClick={() => setPermission(perm.value)}
            >
              <RadioGroupItem
                value={perm.value}
                id={perm.value}
                className="mt-1"
              />
              <div className="flex-1">
                <Label
                  htmlFor={perm.value}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Icon className={`w-4 h-4 ${perm.color}`} />
                  <span className="font-medium text-slate-800">
                    {perm.label}
                  </span>
                </Label>
                <p className="text-sm text-slate-500 mt-1">
                  {perm.description}
                </p>
              </div>
            </div>
          );
        })}
      </RadioGroup>

      {permission === "private" && (
        <div className="mt-4 space-y-2">
          <Label htmlFor="password" className="text-slate-700 font-medium">
            Set Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
            required
          />
          <p className="text-xs text-slate-500">
            Only people with the password can access this image.
          </p>
        </div>
      )}
    </div>
  );
};

export default PermissionSelector;
