"use client";
import React, { useRef, useEffect } from 'react';

const Intro = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play().catch(error => {
              console.error("Autoplay failed:", error);
            });
          } else if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        });
      },
      { threshold: 0.5 }
    );

    const videoElement = videoRef.current;
    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, []);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark"> {/* Added responsive horizontal padding */}
        {/* Row 1: Two-Column Text Content - Now within a container */}
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column: Main Heading */}
          <div className="text-gray-800 dark:text-gray-200"> {/* Added dark mode text color */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">Empowering Growth <br />Through Thoughtful <br />Design & Development</h2> {/* Responsive font sizes */}
          </div>

          {/* Right Column: Paragraph and Details */}
          <div className="text-gray-700 dark:text-gray-300"> {/* Added dark mode text color */}
            <p className="text-lg mb-6">At Agnikii Digital, we craft <span className="font-semibold text-pink-500">sustainable</span> websites that spark innovation and create lasting impact. Trusted by industry leaders and visionaries, we transform ideas into extraordinary digital experiences.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-12"> {/* Made stats responsive */}
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-1 text-gray-900 dark:text-gray-100">Founded</h3> {/* Added dark mode text color */}
                <p className="text-sm text-gray-600 dark:text-gray-400">Your Founding Year</p> {/* Replace, Added dark mode text color */}
              </div>
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-1 text-gray-900 dark:text-gray-100">Industry</h3> {/* Added dark mode text color */}
                <p className="text-sm text-gray-600 dark:text-gray-400">Your Industry Focus</p> {/* Replace, Added dark mode text color */}
              </div>
              <div className="relative">
                <div className="absolute -top-3 left-0 text-pink-500 text-4xl">+</div>
                <div className="ml-6">
                  <h3 className="font-semibold text-sm uppercase tracking-wider mb-1 text-gray-900 dark:text-gray-100">Campaigns <br />Launched</h3> {/* Added dark mode text color */}
                  <p className="text-sm text-gray-600 dark:text-gray-400">Your Campaigns Count</p> {/* Replace, Added dark mode text color */}
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-1 text-gray-900 dark:text-gray-100">Recognitions</h3> {/* Added dark mode text color */}
              <p className="text-sm text-gray-600 dark:text-gray-400">Your Notable Recognitions</p> {/* Replace, Added dark mode text color */}
            </div>
          </div>
        </div>

        {/* Row 2: Masked Video - Now within a container and responsive */}
        <div className="container mx-auto mt-16 flex justify-center px-4 sm:px-0"> {/* Added responsive horizontal padding for video container */}
          <div className="relative rounded-lg overflow-hidden w-full max-w-4xl h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px]"> {/* Responsive height, max-w-4xl for boxed size */}
            <video
              ref={videoRef}
              src="gg2.mp4" // Replace with your video path
              loop
              muted
              playsInline // Added playsInline for better mobile autoplay
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            {/* Optional: Hero UI Mask component could go here if needed */}
            {/* <Mask shape="your-mask-shape" className="absolute top-0 left-0 w-full h-full" /> */}
            <div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 opacity-20"
              aria-hidden="true"
            ></div>
          </div>
        </div>
    </div>
  );
};

export default Intro;