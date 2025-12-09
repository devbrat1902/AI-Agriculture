"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, Loader2, Github } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Container } from "@/components/layout/Container";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email);
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Side - Image/Brand */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-agri-900 items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-black/50 to-black/80 z-10" />
        <img
          src="/images/auth_side_image.png"
          alt="Smart Farming"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-20 max-w-md text-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-black/80 backdrop-blur-md p-4 rounded-2xl inline-block mb-8 border border-white/10">
              <img src="/images/Gemini_Generated_Image_4tx5xo4tx5xo4tx5.png" alt="Logo" className="h-20 w-40 mx-auto object-contain" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Welcome Back</h1>
            <p className="text-gray-300 text-lg">
              Access your personalized farming dashboard, AI insights, and market trends.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black relative">
        <Link
          href="/"
          className="absolute top-8 left-8 text-gray-400 hover:text-white flex items-center transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <Container size="sm">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto px-4"
          >
            <div className="text-center mb-10 lg:hidden">
              <img src="/images/Gemini_Generated_Image_4tx5xo4tx5xo4tx5.png" alt="Logo" className="h-16 w-32 mx-auto mb-4 object-contain" />
              <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            </div>

            <motion.div
              className="bg-agri-900/50 border border-primary-500/30 p-8 rounded-2xl backdrop-blur-sm transition-all duration-200 auth-form-glow"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Sign into your account</h2>
              <p className="text-gray-400 mb-8">Enter your details significantly below</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <Input
                      type="email"
                      placeholder="farmer@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-black/50 border-white/10 text-white focus:border-primary-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-300">Password</label>
                    <Link href="#" className="text-sm text-primary-400 hover:text-primary-300">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-black/50 border-white/10 text-white focus:border-primary-500"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary-600 text-white hover:bg-white hover:text-agri-900 shadow-lg shadow-primary-900/20 transition-all duration-300"
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
              </form>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-agri-900 px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full border-gray-700 bg-black/50 text-gray-300 hover:bg-white/5 hover:text-white">
                    <Github className="h-4 w-4 mr-2" />
                    Github
                  </Button>
                  <Button variant="outline" className="w-full border-gray-700 bg-black/50 text-gray-300 hover:bg-white/5 hover:text-white">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                      />
                    </svg>
                    Google
                  </Button>
                </div>
              </div>

              <div className="mt-6 text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <Link href="/signup" className="font-medium text-primary-400 hover:text-primary-300">
                  Sign up for free
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </div>
  );
}
