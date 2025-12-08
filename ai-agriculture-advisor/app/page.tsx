"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Sprout,
  CloudSun,
  TrendingUp,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Leaf,
  Shield,
  Zap,
  Users,
  Star,
  ChevronDown
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  const features = [
    {
      icon: Sprout,
      image: "/images/disease-detection.png",
      title: "AI Disease Detection",
      description:
        "Upload plant images and get instant AI-powered diagnoses with treatment recommendations.",
      color: "from-primary-500 to-primary-600",
      bgColor: "from-emerald-500/20 to-green-600/20",
    },
    {
      icon: CloudSun,
      image: "/images/weather-forecast.png",
      title: "Weather Forecast",
      description:
        "Get farming-specific weather insights with irrigation and harvesting recommendations.",
      color: "from-info to-info-dark",
      bgColor: "from-sky-500/20 to-blue-600/20",
    },
    {
      icon: TrendingUp,
      image: "/images/market-price.png",
      title: "Market Price Tracker",
      description:
        "Real-time mandi prices, trends, and predictions to maximize your profits.",
      color: "from-warning to-warning-dark",
      bgColor: "from-amber-500/20 to-orange-600/20",
    },
    {
      icon: MessageCircle,
      image: "/images/chatbot-assistant.png",
      title: "AI Chatbot Assistant",
      description:
        "24/7 agricultural expert at your fingertips. Ask anything about farming.",
      color: "from-success to-success-dark",
      bgColor: "from-teal-500/20 to-cyan-600/20",
    },
  ];

  const stats = [
    { value: "10K+", label: "Farmers Helped" },
    { value: "50K+", label: "Crops Analyzed" },
    { value: "95%", label: "Accuracy Rate" },
    { value: "24/7", label: "Support" },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Punjab",
      quote:
        "The disease detection feature saved my wheat crop. Identified the problem early and prevented major loss!",
      rating: 5,
      avatar: "👨‍🌾",
    },
    {
      name: "Lakshmi Devi",
      location: "Tamil Nadu",
      quote:
        "Market price predictions helped me sell at the right time. Increased my income by 25%!",
      rating: 5,
      avatar: "👩‍🌾",
    },
    {
      name: "Suresh Patel",
      location: "Gujarat",
      quote:
        "Weather alerts and irrigation recommendations are incredibly helpful. No more guesswork!",
      rating: 5,
      avatar: "👨‍🌾",
    },
  ];

  const faqs = [
    {
      question: "How accurate is the disease detection?",
      answer:
        "Our AI model has a 95% accuracy rate, trained on thousands of crop disease images. It gets better with every use!",
    },
    {
      question: "Is the service available in regional languages?",
      answer:
        "Yes! We support multiple Indian languages including Hindi, Tamil, Telugu, Marathi, and more.",
    },
    {
      question: "How much does it cost?",
      answer:
        "Basic features are free forever! Premium plans start at ₹299/month with advanced analytics and priority support.",
    },
    {
      question: "Can I use it offline?",
      answer:
        "Some features like viewing saved reports work offline. For AI features, you need internet connectivity.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply sign up with your phone number or email. No credit card required for the free plan!",
    },
  ];

  return (
    <div className="min-h-screen bg-agri-50">
      <Header transparent />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        {/* Full-Screen Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/11903852_3840_2160_25fps.mp4" type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
          </video>

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>

        <Container className="relative z-10">
          <div
            className="max-w-4xl mx-auto text-center"
            style={{ opacity: heroOpacity.get(), transform: `translateY(${heroY.get()}px)` }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-block"
            >
              <Badge variant="success" size="lg" className="px-4 py-2">
                <Zap className="h-4 w-4 mr-1" />
                AI-Powered Farming Solutions
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-agri-900 mb-6 leading-tight font-display"
            >
              Transform Your Farm with
              <span className="bg-gradient-to-r from-primary-500 to-primary-300 bg-clip-text text-transparent">
                {" "}Intelligent Agriculture
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-agri-500 mb-10 max-w-3xl mx-auto"
            >
              Detect crop diseases instantly, track market prices, get weather
              alerts, and receive personalized farming advice — all in one place.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/signup">
                <Button size="xl" className="w-full sm:w-auto shadow-glow">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="xl" className="w-full sm:w-auto border-agri-200 text-agri-700 hover:bg-agri-100">
                  Explore Features
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-agri-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-agri-100/50">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="success" className="mb-4">
              Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-agri-900 mb-4 font-display">
              Everything You Need for Smart Farming
            </h2>
            <p className="text-lg text-agri-500 max-w-2xl mx-auto">
              Comprehensive tools designed specifically for Indian farmers to
              increase yield and reduce risks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgb(16 185 129 / 0.4), 0 8px 10px -6px rgb(16 185 129 / 0.4), 0 0 15px 2px rgb(16 185 129 / 0.3)"
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  className="rounded-xl"
                >
                  <Card className="h-full group border-transparent hover:border-primary-500/30 transition-all duration-200">
                    <CardHeader>
                      {/* Icon and Title in Colored Rectangle */}
                      <div className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br ${feature.bgColor} mb-6 border border-agri-700/30`}>
                        {feature.image ? (
                          <motion.img
                            src={feature.image}
                            alt={feature.title}
                            className="w-12 h-12 object-contain flex-shrink-0"
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.2,
                            }}
                          />
                        ) : (
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.2,
                            }}
                            className="flex-shrink-0"
                          >
                            <Icon className="w-12 h-12 text-primary-400" />
                          </motion.div>
                        )}

                        <h3 className="text-xl font-bold text-agri-50 group-hover:text-white transition-colors duration-300">
                          {feature.title}
                        </h3>
                      </div>

                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href={`/${feature.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <Button variant="ghost" className="p-0 h-auto text-primary-400 hover:text-primary-300 transition-colors group/btn">
                          Learn More
                          <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-agri-100 to-agri-50">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="success" className="mb-4">
              Testimonials
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-agri-900 mb-4 font-display">
              Trusted by Farmers Across India
            </h2>
            <p className="text-lg text-agri-500 max-w-2xl mx-auto">
              See how farmers are transforming their practices with AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                      ))}
                    </div>
                    <p className="text-agri-600 mb-6 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{testimonial.avatar}</div>
                      <div>
                        <div className="font-semibold text-agri-800">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-agri-400">
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-agri-50">
        <Container size="md">
          <div className="text-center mb-16">
            <Badge variant="success" className="mb-4">
              FAQ
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-agri-900 mb-4 font-display">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-agri-500">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 to-primary-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of farmers already using AI to grow smarter.
              Start your free trial today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button
                  size="xl"
                  className="w-full sm:w-auto bg-agri-900 text-white hover:bg-agri-800 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-agri-700"
                >
                  Get Started Free
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/help">
                <Button
                  size="xl"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-primary-600 transition-all duration-300"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}

// FAQ Accordion Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
      initial={false}
      className="border border-agri-200 rounded-lg overflow-hidden bg-agri-100/30"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-agri-100/50 transition-colors"
      >
        <span className="font-semibold text-lg text-agri-900">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-5 w-5 text-agri-400" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 text-agri-600">{answer}</div>
      </motion.div>
    </motion.div>
  );
}
