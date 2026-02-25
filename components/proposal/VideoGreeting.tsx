"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import Image from "next/image";

interface VideoGreetingProps {
  clientName?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  tooltipText?: string; // ← NEW: Dynamic from Sanity
}
export default function VideoGreeting({
  clientName = "there",
  videoUrl = "/video/mockup-preview.mp4",
  thumbnailUrl = "/team/avatar-1.jpeg",
  tooltipText = "Hi {{clientName}}, watch this!",
}: VideoGreetingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video play/pause when opening/closing
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
      videoRef.current.currentTime = 0;
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Widget (Bottom Left of Hero) */}
      <div className="absolute bottom-8 left-8 z-30 hidden md:block">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              animate={{ scale: 1, opacity: 1 }}
              className="relative group"
              exit={{ scale: 0, opacity: 0 }}
              initial={{ scale: 0, opacity: 0 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
                delay: 1,
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Tooltip */}
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className="absolute left-full top-1/2 -translate-y-1/2 ml-4 whitespace-nowrap bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-white text-sm font-medium"
                initial={{ opacity: 0, x: -10 }}
                transition={{ delay: 1.5 }}
              >
                <span className="relative z-10">{tooltipText}</span>
                {/* Arrow */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 -mr-[1px] border-8 border-transparent border-r-white/10" />
              </motion.div>

              {/* Circle Button */}
              <button
                className="relative w-24 h-24 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl transition-transform hover:scale-105 group"
                onClick={() => setIsOpen(true)}
              >
                <Image
                  fill
                  alt="Video Thumbnail"
                  className="object-cover"
                  src={thumbnailUrl}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                {/* Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-white fill-white ml-1" />
                  </div>
                </div>

                {/* Pulse Effect */}
                <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping opacity-20" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Expanded Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Video Player Card */}
            <motion.div
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              exit={{ scale: 0.8, opacity: 0 }}
              initial={{ scale: 0.8, opacity: 0 }}
              layoutId="video-player"
            >
              {/* Controls Header */}
              <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 bg-gradient-to-b from-black/60 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                    <Image
                      alt="Avatar"
                      className="object-cover"
                      height={32}
                      src={thumbnailUrl}
                      width={32}
                    />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">
                      Personal Introduction
                    </p>
                    <p className="text-white/60 text-xs">For {clientName}</p>
                  </div>
                </div>
                <button
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Element */}
              <video
                ref={videoRef}
                autoPlay
                controls
                className="w-full h-full object-cover"
                src={videoUrl}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
