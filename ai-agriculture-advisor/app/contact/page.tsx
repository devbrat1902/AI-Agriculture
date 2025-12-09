"use client";

import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Green Gradient Background Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-green-900/20 rounded-full blur-[120px] -z-10" />

      <Header />
      <main className="pt-16">
        <section className="py-24">
          <Container>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">
                Contact Us
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold !text-white mb-4 font-display">
                We're Here to Help
              </h2>
              <p className="text-lg !text-gray-400 max-w-2xl mx-auto">
                Have questions or need support? Reach out to our team.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Contact Info */}
              <div className="space-y-8">
                <Card className="p-8 border-none shadow-lg bg-gradient-to-br from-green-900/50 to-black border border-green-900/30 text-white relative overflow-hidden group">
                  <div className="absolute inset-0 bg-green-600/5 group-hover:bg-green-600/10 transition-colors duration-500" />
                  <h3 className="text-2xl font-bold mb-6 relative z-10">Get in Touch</h3>
                  <div className="space-y-6 relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-green-500/10 rounded-lg backdrop-blur-sm">
                        <Phone className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <div className="font-semibold text-green-200 mb-1">Phone</div>
                        <div className="text-lg">+91 1234 567 890</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-green-500/10 rounded-lg backdrop-blur-sm">
                        <Mail className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <div className="font-semibold text-green-200 mb-1">Email</div>
                        <div className="text-lg">support@agriadvisor.com</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-green-500/10 rounded-lg backdrop-blur-sm">
                        <MapPin className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <div className="font-semibold text-green-200 mb-1">Office</div>
                        <div className="text-lg">
                          123 Farming Hub, Tech Park,<br />
                          Bangalore, Karnataka - 560001
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Contact Form */}
              <Card className="p-8 shadow-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">First Name</label>
                      <Input placeholder="John" className="bg-black/50 border-gray-700 text-white placeholder:text-gray-600 focus:border-green-500/50 focus:ring-green-500/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Last Name</label>
                      <Input placeholder="Doe" className="bg-black/50 border-gray-700 text-white placeholder:text-gray-600 focus:border-green-500/50 focus:ring-green-500/20" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email</label>
                    <Input type="email" placeholder="john@example.com" className="bg-black/50 border-gray-700 text-white placeholder:text-gray-600 focus:border-green-500/50 focus:ring-green-500/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Message</label>
                    <textarea
                      className="flex w-full rounded-md border border-gray-700 bg-black/50 px-3 py-2 text-sm shadow-sm text-white placeholder:text-gray-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-500/50 disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px]"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-400 hover:to-green-500 border-none shadow-lg shadow-green-500/20 transition-all duration-300" size="lg">
                    Send Message
                    <Send className="h-4 w-4 ml-2" />
                  </Button>
                </form>
              </Card>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
