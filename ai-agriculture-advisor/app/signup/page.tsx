"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, User, MapPin, Sprout, ChevronRight, Check, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const { signup, isLoading } = useAuth();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "farmer" as "farmer" | "expert",
    farmName: "",
    location: "",
    cropTypes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup({
      name: formData.name,
      email: formData.email,
      role: formData.role,
      farmName: formData.farmName,
    });
  };

  // Steps Configuration
  const steps = [
    { id: 1, title: "Account Details", icon: User },
    { id: 2, title: "Personal Info", icon: MapPin },
    { id: 3, title: "Farm Profile", icon: Sprout },
  ];

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

        <div className="relative z-20 max-w-lg text-center px-8">
          <div className="bg-black/80 backdrop-blur-md p-4 rounded-2xl inline-block mb-8 border border-white/10">
            <img src="/images/Gemini_Generated_Image_4tx5xo4tx5xo4tx5.png" alt="Logo" className="h-20 w-40 mx-auto object-contain" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-6">Join the Revolution</h1>
          <div className="space-y-4 text-left bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10">
            <div className="flex items-start">
              <div className="bg-primary-500/20 p-2 rounded-lg mr-4">
                <Check className="h-5 w-5 text-primary-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">AI Disease Detection</h3>
                <p className="text-sm text-gray-400">Instantly identify crop diseases with 98% accuracy.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary-500/20 p-2 rounded-lg mr-4">
                <Check className="h-5 w-5 text-primary-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">Smart Weather Alerts</h3>
                <p className="text-sm text-gray-400">Localized forecasts and extreme weather warnings.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary-500/20 p-2 rounded-lg mr-4">
                <Check className="h-5 w-5 text-primary-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">Market Insights</h3>
                <p className="text-sm text-gray-400">Real-time mandi prices and trend analysis.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Wizard Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black relative">
        <Link
          href="/"
          className="absolute top-8 left-8 text-gray-400 hover:text-white flex items-center transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <Container size="sm">
          <div className="w-full max-w-md mx-auto px-4">
            <div className="text-center mb-8">
              <img src="/images/Gemini_Generated_Image_4tx5xo4tx5xo4tx5.png" alt="Logo" className="h-12 w-24 mx-auto mb-4 lg:hidden object-contain" />
              <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
              <p className="text-gray-400">Step {step} of 3: {steps[step - 1].title}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {steps.map((s) => (
                  <div
                    key={s.id}
                    className={cn(
                      "flex flex-col items-center w-1/3",
                      step >= s.id ? "text-primary-500" : "text-gray-600"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center mb-2 border-2 transition-colors",
                      step >= s.id
                        ? "bg-primary-500 border-primary-500 text-white"
                        : "border-gray-700 text-gray-600"
                    )}>
                      <s.icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-medium hidden sm:block">{s.title}</span>
                  </div>
                ))}
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <motion.div
              className="bg-agri-900/50 border border-primary-500/30 p-8 rounded-2xl backdrop-blur-sm transition-all duration-200 auth-form-glow"
            >
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                        <Input
                          name="name"
                          placeholder="Rajesh Kumar"
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-black/50 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                        <Input
                          name="email"
                          type="email"
                          placeholder="farmer@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-black/50 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleChange}
                          className="bg-black/50 border-white/10 text-white"
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">I am a...</label>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, role: 'farmer' })}
                            className={cn(
                              "p-4 rounded-xl border transition-all text-center",
                              formData.role === 'farmer'
                                ? "bg-primary-500/20 border-primary-500 text-primary-400"
                                : "bg-black/50 border-white/10 text-gray-400 hover:border-white/30"
                            )}
                          >
                            <User className="h-6 w-6 mx-auto mb-2" />
                            <span className="block font-bold">Farmer</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, role: 'expert' })}
                            className={cn(
                              "p-4 rounded-xl border transition-all text-center",
                              formData.role === 'expert'
                                ? "bg-primary-500/20 border-primary-500 text-primary-400"
                                : "bg-black/50 border-white/10 text-gray-400 hover:border-white/30"
                            )}
                          >
                            <Sprout className="h-6 w-6 mx-auto mb-2" />
                            <span className="block font-bold">Expert</span>
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Location / District</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                          <Input
                            name="location"
                            placeholder="e.g. Pune, Maharashtra"
                            value={formData.location}
                            onChange={handleChange}
                            className="pl-10 bg-black/50 border-white/10 text-white"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Farm Name (Optional)</label>
                        <Input
                          name="farmName"
                          placeholder="e.g. Green Valley Farm"
                          value={formData.farmName}
                          onChange={handleChange}
                          className="bg-black/50 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Primary Crops</label>
                        <Input
                          name="cropTypes"
                          placeholder="e.g. Wheat, Rice, Cotton"
                          value={formData.cropTypes}
                          onChange={handleChange}
                          className="bg-black/50 border-white/10 text-white"
                        />
                        <p className="text-xs text-gray-500 mt-1">Separate multiple crops with commas</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-4 mt-8">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="w-1/3 border-gray-600 text-gray-300"
                    >
                      Back
                    </Button>
                  )}

                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className={cn(
                        "bg-white text-black hover:bg-gray-200",
                        step > 1 ? "w-2/3" : "w-full"
                      )}
                    >
                      Next Step <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="w-2/3 bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-900/20"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  )}
                </div>
              </form>

              <div className="mt-6 text-center text-sm text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-primary-400 hover:text-primary-300">
                  Sign in
                </Link>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>
    </div>
  );
}
