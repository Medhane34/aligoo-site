"use client";
import React from 'react';

const WhyFacebookAdsWork = () => {
  return (
    <div className="py-16 bg-gray-900 text-white"> {/* Solid dark background */}
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          Why Facebook Ads Still Work (If You Do Them <span className="text-pink-500">Right</span>)
        </h2>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-2 mb-12">
        {/* First Column (40% width on medium and above) */}
        <div className="md:w-2/5">
          <p>
            Many believe Facebook Ads are outdated. We disagree. When executed strategically, they remain a powerful tool for reaching your audience and driving real results.
          </p>
        </div>

        {/* Second Column (60% width on medium and above) */}
        <div className="md:w-3/5">
          <p>
            The key is in understanding that the platform has evolved. Gone are the days of simple boosting. Today, success with Facebook Ads hinges on a deep understanding of the <strong className="text-pink-500">customer journey</strong>, crafting ads that speak directly to <em className="italic">user needs and desires</em>, and employing <strong className="text-pink-500">precision targeting</strong>. Without these elements, your ad spend is likely going to waste.
          </p>
        </div>
      </div>

      {/* Facebook Ads Statistics Section */}
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
        <div>
          <div className="text-4xl font-bold">3.04B+</div>
          <p className="text-sm text-gray-400">Monthly Active Users</p>
        </div>
        <div>
          <div className="text-4xl font-bold">1.98B+</div>
          <p className="text-sm text-gray-400">Daily Active Users</p>
        </div>
        <div>
          <div className="text-4xl font-bold">69%</div>
          <p className="text-sm text-gray-400">Adults Use Facebook</p>
        </div>
        <div>
          <div className="text-4xl font-bold">~$12</div>
          <p className="text-sm text-gray-400">Avg. Ad Spend Per User</p>
        </div>
      </div>
    </div>
  );
};

export default WhyFacebookAdsWork;