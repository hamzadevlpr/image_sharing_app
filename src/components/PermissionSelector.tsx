import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Globe, Lock, Users } from "lucide-react";
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
    },
    {
      value: "private" as const,
      label: "Private",
      description: "Only you can view this image",
      icon: Lock,
      color: "text-slate-600",
    },
    {
      value: "restricted" as const,
      label: "Restricted",
      description: "Share with specific users or via link",
      icon: Users,
      color: "text-blue-600",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200">
      <h3 className="text-lg font-medium text-slate-800 mb-4">
        Sharing Permissions
      </h3>

      <RadioGroup
        value={permission}
        onValueChange={(value: "public" | "private" | "restricted") =>
          setPermission(value)
        }
        className="space-y-3"
      >
        {permissions.map((perm) => {
          const Icon = perm.icon;
          return (
            <div key={perm.value} className="flex items-start space-x-3">
              <RadioGroupItem
                value={perm.value}
                id={perm.value}
                className="mt-1"
              />
              <div
                className="flex-1 cursor-pointer"
                onClick={() => setPermission(perm.value)}
              >
                <Label
                  htmlFor={perm.value}
                  className="flex items-center cursor-pointer"
                >
                  <Icon className={`w-4 h-4 mr-2 ${perm.color}`} />
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
          <Label htmlFor="password" className="text-slate-700">
            Set File Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter file password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
            required
          />
        </div>
      )}
    </div>
  );
};

export default PermissionSelector;
