import React from "react";
import { motion } from "framer-motion";
import { Message } from "@/lib/api/chatbot";
import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
  isLatest?: boolean;
}

export function MessageBubble({ message, isLatest }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex gap-3 mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center">
          <Bot className="h-5 w-5 text-primary-400" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-3",
          isUser
            ? "bg-primary-600 text-white"
            : "bg-agri-900/50 border border-white/10 text-gray-100"
        )}
      >
        {/* Message Content */}
        <div className="prose prose-invert prose-sm max-w-none">
          {message.content.split('\n').map((line, i) => {
            // Handle bold text
            const parts = line.split(/(\*\*.*?\*\*)/g);
            return (
              <p key={i} className="mb-2 last:mb-0">
                {parts.map((part, j) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={j}>{part.slice(2, -2)}</strong>;
                  }
                  return <span key={j}>{part}</span>;
                })}
              </p>
            );
          })}
        </div>

        {/* Timestamp */}
        <p className={cn(
          "text-xs mt-2",
          isUser ? "text-white/70" : "text-gray-500"
        )}>
          {message.timestamp.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
          <User className="h-5 w-5 text-white" />
        </div>
      )}
    </motion.div>
  );
}
