"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Eye,
  EyeOff,
  FileText,
  Lock,
  Mail,
  MoveLeft,
  Shield,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { forgotSchema, loginSchema, registerSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type AuthMode = "login" | "register" | "forgot";

const Auth = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const getSchema = () => {
    if (authMode === "login") return loginSchema;
    if (authMode === "register") return registerSchema;
    if (authMode === "forgot") return forgotSchema;
    return loginSchema;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(getSchema()),
  });

  useEffect(() => {
    reset();
  }, [authMode, reset]);

  const onSubmit = (data: any) => {
    console.log("Validated Data:", data);
    // Your API logic goes here
  };

  return (
    <div className="!h-full py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PicShare</h1>
          <p className="text-gray-600">Secure file sharing made simple</p>
        </div>

        {/* Auth Card */}
        <Card className="backdrop-blur-md bg-white/70 border-0 shadow-2xl shadow-teal-500/10">
          <CardContent className="p-8">
            {/* Mode Tabs */}
            <div className="flex space-x-1 bg-gray-100/50 rounded-xl p-1 mb-6">
              <Button
                variant="tab"
                onClick={() => setAuthMode("login")}
                className={` ${
                  authMode === "login"
                    ? "bg-white text-teal-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Sign In
              </Button>
              <Button
                variant="tab"
                onClick={() => setAuthMode("register")}
                className={` ${
                  authMode === "register"
                    ? "bg-white text-teal-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Sign Up
              </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Register: Name Field */}
              {authMode === "register" && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      {...register("name")}
                      className={`pl-10 h-12 bg-white/50 border-gray-200/50 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all ${
                        errors.name ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.name?.message && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.name.message as string}
                    </p>
                  )}
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    {...register("email")}
                    placeholder={
                      authMode === "forgot"
                        ? "Enter your email to reset password"
                        : "Enter your email"
                    }
                    className={`pl-10 h-12 bg-white/50 border-gray-200/50 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.email?.message && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message as string}
                  </p>
                )}
              </div>

              {/* Password Fields */}
              {authMode !== "forgot" && (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...register("password")}
                        className={`pl-10 pr-10 h-12 bg-white/50 border-gray-200/50 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all ${
                          errors.password ? "border-red-500" : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.password?.message && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.password.message as string}
                      </p>
                    )}
                  </div>

                  {/* Register: Confirm Password */}
                  {authMode === "register" && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          {...register("confirmPassword")}
                          placeholder="Confirm your password"
                          className={`pl-10 pr-10 h-12 bg-white/50 border-gray-200/50 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all ${
                            errors.confirmPassword ? "border-red-500" : ""
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword?.message && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.confirmPassword.message as string}
                        </p>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* Forgot Password Link */}
              {authMode === "login" && (
                <div className="text-right">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setAuthMode("forgot")}
                  >
                    Forgot password?
                  </Button>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center justify-center">
                  {authMode === "login" && (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Sign In Securely
                    </>
                  )}
                  {authMode === "register" && (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Create Account
                    </>
                  )}
                  {authMode === "forgot" && (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Reset Link
                    </>
                  )}
                </div>
              </Button>

              {/* Back to Login */}
              {authMode === "forgot" && (
                <button
                  type="button"
                  onClick={() => setAuthMode("login")}
                  className="w-full text-sm text-gray-600 hover:text-gray-900 font-medium mt-4"
                >
                  ← Back to Sign In
                </button>
              )}

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => router.push("/")}
                >
                  <>
                    <MoveLeft className="h-4 w-4 mr-2" />
                    Go to Home Page
                  </>
                </Button>
              </div>
            </form>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-teal-50/50 rounded-xl border border-teal-100/50">
              <div className="flex items-center text-sm text-teal-700">
                <Shield className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>Your data is protected with end-to-end encryption</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2024 PicShare. Secure file sharing for everyone.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a
              href="/privacy"
              className="hover:text-teal-600 transition-colors"
            >
              Privacy
            </a>
            <a href="/terms" className="hover:text-teal-600 transition-colors">
              Terms
            </a>
            <a
              href="/contact"
              className="hover:text-teal-600 transition-colors"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;