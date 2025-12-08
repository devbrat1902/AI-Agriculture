import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  className?: string;
  delay?: number;
}

export function ActionCard({
  title,
  description,
  icon: Icon,
  href,
  className,
  delay = 0,
}: ActionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.05,
        boxShadow:
          "0 20px 25px -5px rgb(16 185 129 / 0.4), 0 8px 10px -6px rgb(16 185 129 / 0.4), 0 0 15px 2px rgb(16 185 129 / 0.3)",
      }}
      transition={{ duration: 0.2, delay }}
      className={cn("rounded-xl", className)}
    >
      <Link
        href={href}
        className="block bg-agri-900/50 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:border-primary-500/30 transition-colors duration-200 h-full group"
      >
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="p-4 bg-primary-500/20 rounded-2xl group-hover:bg-primary-500/30 transition-colors">
            <Icon className="h-8 w-8 text-primary-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
