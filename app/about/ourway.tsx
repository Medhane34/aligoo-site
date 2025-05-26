"use client";
import React, { useState } from 'react';
import { Button } from "@heroui/button"; // Assuming Button is imported if not already globally available
import { Image } from "@heroui/image"; // Assuming Image component is available

const OurWayPoints = [
  {
    number: "01",
    heading: "Add your first product",
    description: "Effortlessly list your initial offerings with intuitive tools and guided setup.",
  },
  {
    number: "02",
    heading: "Customize your store",
    description: "Tailor your online presence to reflect your brand's unique style and identity.",
  },
  {
    number: "03",
    heading: "Set up payments",
    description: "Integrate secure and diverse payment options to ensure smooth transactions.",
  },
  // Add more points as needed for "Our Way"
];

const AligooMarketingFix = () => {
  const [activeTab, setActiveTab] = useState('problem'); // 'problem' or 'ourWay'

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <div className="py-16 bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4 text-text-light dark:text-text-dark">
        {/* Tab Navigation */}
        <div className="flex justify-center border-gray-200">
          <button
            className={`py-2 px-4 font-semibold ${
              activeTab === 'problem' ? 'text-text-light dark:text-text-dark border-b-2 border-pink-500' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleTabChange('problem')}
          >
            ❌ The Problem
          </button>
          <button
            className={`py-2 px-4 font-semibold ${
              activeTab === 'ourWay' ? 'text-text-light dark:text-text-dark border-b-2 border-pink-500' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleTabChange('ourWay')}
          >
            ✅ Our Way
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
           {activeTab === 'problem' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-8">
                    {/* Left: Image + Testimonial Box */}
                    <div className="relative">
                      <Image
                        src="https://heroui.com/images/hero-card-complete.jpeg" // replace with your actual image path
                        alt="Merchant testimonial"
                        width={500}
                        height={500}
                        className="rounded-xl shadow-2xl object-cover z-0"
                      />
                      <div className="absolute m-[-25] bottom-0 right-[54] bg-gray-900 bg-opacity-90 text-white p-6 rounded-xl max-w-sm shadow-xl z-13">
                        <p className="text-lg italic">“Aligoo gave us the clarity and execution power we needed to scale fast.”</p>
                        <p className="mt-4 font-semibold">Jessica Wise<br /><span className="text-sm opacity-75">CEO, Hell Babes</span></p>
                      </div>
                    </div>

                    {/* Right: Headline, Text, Stats */}
                    <div className="space-y-6">
                      <h2 className="text-4xl font-bold text-text-light dark:text-text-dark">
                        Aligoo has your back
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400">
                        Whether you need help dialing in your offer, ramping up performance creatives, or scaling ad spend efficiently—our team is built to deliver outcomes.
                      </p>

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-2xl font-semibold text-pink-500">$3M+</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">Revenue driven for clients</p>
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold text-pink-500">200%+</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">Average return on ad spend</p>
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold text-pink-500">0% B.S.</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">We care about results, not vanity</p>
                        </div>
                      </div>
                    </div>
                  </div>
       )}


          {activeTab === 'ourWay' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center py-8"> {/* Responsive grid layout */}
              {/* Left Column: Images Side by Side with Offset */}
                  <div className="flex justify-center items-center gap-12 relative">
                      {/* Left Image - slightly lower */}
                        <div className="relative z-10">
                          <Image
                            src="https://heroui.com/images/hero-card-complete.jpeg"
                            alt="E-commerce Dashboard"
                            width={300}
                            height={300}
                            className="rounded-xl shadow-2xl object-cover"
                          />
                        </div>

                        {/* Right Image - slightly offset upward and left */}
                        <div className="relative -mt-8 -ml-8 z-0">
                          <Image
                            src="https://heroui.com/images/card-example-4.jpeg"
                            alt="Cashier Interaction"
                            width={300}
                            height={300}
                            className="rounded-xl shadow-xl object-cover"
                          />
                        </div>
                      </div>



              {/* Right Column: Numbered List */}
              <div className="space-y-8 text-left">
                {OurWayPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <span className="text-4xl font-bold text-pink-500 flex-shrink-0 mt-1">
                      {point.number}
                    </span>
                    <div>
                      <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-1">
                        {point.heading}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-base">
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
           {/* CTA Button - placed outside the tab content grid */}
           <div className="mt-12 text-center">
             <Button
               className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
             >
               Take your shot
             </Button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AligooMarketingFix;