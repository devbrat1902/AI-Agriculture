"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { User, Mail, MapPin, Camera, Save, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "farmer",
    location: "Pune, Maharashtra", // Mock data
    bio: "Passionate about sustainable farming and organic crops.",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">My Profile</h1>
            <p className="text-gray-400 mt-2">Manage your account settings and preferences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Avatar & Core Info */}
            <div className="col-span-1">
              <div className="bg-agri-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-green-700 p-1 mx-auto">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-4xl font-bold text-primary-500">
                          {user?.name?.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-primary-600 rounded-full text-white hover:bg-primary-500 border-4 border-black transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>

                <h2 className="text-xl font-bold text-white">{user?.name}</h2>
                <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-primary-400 capitalize">
                  {user?.role}
                </span>

                <div className="mt-6 border-t border-white/10 pt-6 text-left">
                  <div className="flex items-center text-gray-400 mb-3 text-sm">
                    <Mail className="h-4 w-4 mr-3 text-gray-500" />
                    {user?.email}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <MapPin className="h-4 w-4 mr-3 text-gray-500" />
                    Pune, Maharashtra
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Edit Form */}
            <div className="col-span-1 md:col-span-2">
              <div className="bg-agri-900/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Personal Information</h3>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-black/50 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled
                        className="bg-black/50 border-white/10 text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="bg-black/50 border-white/10 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="w-full rounded-xl bg-black/50 border border-white/10 text-white p-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button
                      type="submit"
                      disabled={isSaving}
                      className="bg-primary-600 hover:bg-primary-500 text-white"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
