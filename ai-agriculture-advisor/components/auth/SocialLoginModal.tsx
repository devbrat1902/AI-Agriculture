"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Lock, Mail, Github } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

interface SocialLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (provider: "google" | "github") => Promise<void>;
  provider: "google" | "github" | null;
}

export function SocialLoginModal({
  isOpen,
  onClose,
  onLogin,
  provider,
}: SocialLoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!provider) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network delay for authentication
    await new Promise((resolve) => setTimeout(resolve, 800));
    await onLogin(provider);
    setIsLoading(false);
    onClose();
  };

  const isGoogle = provider === "google";

  // Provider specific styling
  const config = isGoogle
    ? {
      name: "Google",
      logo: (
        <svg className="h-6 w-6" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
          />
        </svg>
      ),
      bgColor: "bg-white",
      textColor: "text-gray-900",
      borderColor: "border-gray-300",
      buttonColor: "bg-blue-600 hover:bg-blue-700 text-white",
    }
    : {
      name: "GitHub",
      logo: <Github className="h-6 w-6" />,
      bgColor: "bg-[#0d1117]",
      textColor: "text-white",
      borderColor: "border-gray-700",
      buttonColor: "bg-[#238636] hover:bg-[#2ea043] text-white",
    };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={cn(
              "relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden",
              config.bgColor,
              config.textColor
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200/10">
              <div className="flex items-center gap-3">
                {config.logo}
                <h3 className="text-xl font-semibold">Sign in with {config.name}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-500/20 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-8">
              <div className="text-center mb-6">
                <p className="opacity-80">
                  Enter your credentials to continue to <span className="font-semibold">AgriAdvisor</span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 opacity-80">
                    Email or Username
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 opacity-50" />
                    <Input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={cn(
                        "pl-10",
                        isGoogle
                          ? "bg-gray-100 border-gray-300 text-gray-900 focus:border-blue-500"
                          : "bg-[#010409] border-gray-700 text-white focus:border-blue-500"
                      )}
                      placeholder={isGoogle ? "email@gmail.com" : "username"}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 opacity-80">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 opacity-50" />
                    <Input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={cn(
                        "pl-10",
                        isGoogle
                          ? "bg-gray-100 border-gray-300 text-gray-900 focus:border-blue-500"
                          : "bg-[#010409] border-gray-700 text-white focus:border-blue-500"
                      )}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className={cn("w-full h-11", config.buttonColor)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-500/5 border-t border-gray-200/10 text-center text-xs opacity-60">
              Secure login provided by {config.name} OAuth 2.0
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
