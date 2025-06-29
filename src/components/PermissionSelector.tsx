import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUpload } from "@/components/UploadProvider";
import React from "react";
import { permissions } from "./CONSTANT";
import PrivateTab from "./Permissions/PrivateTab";
import RestrictedTab from "./Permissions/RestrictedTab";

const PermissionSelector: React.FC = () => {
  const { permission, setPermission, password, setPassword, allowedEmails, setAllowedEmails, allowLinkAccess, setAllowLinkAccess } = useUpload();

  return (
    <div className="bg-white dark:bg-card rounded-xl p-6 border border-border space-y-4 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-2">Sharing Permissions</h3>
      <p className="text-muted-foreground text-sm mb-4">
        Choose how you want to control access to this image.
      </p>

      <RadioGroup
        value={permission}
        onValueChange={(value: "public" | "private" | "restricted") => setPermission(value)}
        className="space-y-3"
      >
        {permissions.map((perm) => {
          const Icon = perm.icon;
          const isSelected = permission === perm.value;

          return (
            <div
              key={perm.value}
              className={`flex items-start space-x-3 p-3 rounded-xl border ${isSelected
                ? "border-teal-600 bg-teal-50/20"
                : "border-slate-200"
                } transition-all duration-200 cursor-pointer group ${perm.bg}`}
              onClick={() => setPermission(perm.value)}
            >
              <RadioGroupItem value={perm.value} id={perm.value} className="mt-1" />
              <div className="flex-1">
                <Label htmlFor={perm.value} className="flex items-center space-x-2 cursor-pointer">
                  <Icon className={`w-4 h-4 ${perm.color}`} />
                  <span className="font-medium text-foreground">{perm.label}</span>
                </Label>
                <p className="text-sm text-muted-foreground mt-1">{perm.description}</p>
              </div>
            </div>
          );
        })}
      </RadioGroup>

      {permission === "restricted" && (
        <RestrictedTab allowedEmails={allowedEmails}
          setAllowedEmails={setAllowedEmails}
          allowLinkAccess={allowLinkAccess}
          setAllowLinkAccess={setAllowLinkAccess}
        />
      )}

      {permission === "private" && (
        <PrivateTab password={password} setPassword={setPassword} />
      )}
    </div>
  );
};

export default PermissionSelector;
