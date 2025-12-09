"use client";

import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-16">
        <section className="py-24 bg-black relative overflow-hidden">
          <Container>
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2">
                <Badge variant="success" className="mb-4">
                  About Us
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold !text-white mb-6 font-display">
                  Empowering Farmers with Technology
                </h2>
                <p className="text-lg !text-gray-300 mb-6 leading-relaxed">
                  At AgriAdvisor, we believe that every farmer deserves access to the best technology.
                  Our mission is to democratize precision agriculture, making advanced AI tools
                  accessible and easy to use for farmers across India.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-900 rounded-lg border border-gray-800 shadow-sm">
                    <div className="text-3xl font-bold text-green-500 mb-1">2023</div>
                    <div className="text-sm font-medium text-gray-400">Founded</div>
                  </div>
                  <div className="p-4 bg-gray-900 rounded-lg border border-gray-800 shadow-sm">
                    <div className="text-3xl font-bold text-green-500 mb-1">Pan-India</div>
                    <div className="text-sm font-medium text-gray-400">Reach</div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-transparent rounded-2xl md:translate-x-4 md:translate-y-4 -z-10" />
                <img
                  src="/images/about_us.png"
                  alt="Farmers using technology"
                  className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
