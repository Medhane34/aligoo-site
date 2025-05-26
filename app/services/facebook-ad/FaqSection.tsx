// components/sections/FaqSection.tsx
import React from 'react';
import AccordionItem from './AccordionItem';// Import the AccordionItem component

export default function FaqSection() {
  // Hardcoded FAQ data
  const faqs = [
    {
      question: 'What is Analytics & Reporting?',
      answer: 'Analytics and reporting in digital marketing involve the collection, measurement, analysis, and interpretation of data from various digital sources, such as websites, social media, and online advertisements. This process helps businesses understand how users interact with their digital content. The insights gained from this analysis are compiled into reports, providing businesses with valuable information on the performance of their marketing campaigns, website functionality, user engagement, and overall return on investment (ROI). These reports guide strategic decisions, helping optimize marketing efforts and improve business outcomes.',
    },
    {
      question: 'What is the importance of analytics and reporting in digital marketing?',
      answer: 'Analytics and reporting are crucial for several reasons: they provide actionable insights into campaign performance, identify areas for improvement, optimize resource allocation, help understand customer behavior, and ultimately drive better business outcomes and ROI. Without them, marketing efforts are largely based on guesswork.',
    },
    {
      question: 'What types of analytics services do you offer?',
      answer: 'We offer a comprehensive suite of analytics services, including website analytics setup and monitoring (Google Analytics 4), SEO performance tracking, social media insights, campaign performance analysis, custom dashboard creation, and in-depth reporting tailored to your business objectives. We also provide competitive analysis and market research.',
    },
    {
      question: 'How often will we receive reports?',
      answer: 'Our reporting frequency is customizable to best suit your needs. We typically provide weekly, bi-weekly, or monthly performance reports, complete with actionable insights and recommendations. For critical campaigns or initial launch phases, daily insights can also be arranged.',
    },
    {
      question: 'What is the process for setting up analytics for a new client?',
      answer: 'Our process begins with a detailed discovery call to understand your business goals and existing data infrastructure. We then proceed with technical setup and configuration of tracking tools (e.g., GA4 implementation), data validation, dashboard creation, and an initial reporting and strategy session to ensure you\'re fully empowered with your data from day one.',
    },
    // Add more FAQs as needed
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"> {/* Using a slightly darker background for the section */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Column - Static Content */}
        <div className="lg:pr-8"> {/* Add some right padding on larger screens */}
          <p className="text-sm font-semibold uppercase tracking-wider text-purple-400 mb-2">
            Common Questions
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            Analytics & Reporting FAQs: <br /> Understanding the Essentials
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
            Unlock the power of data with our Analytics & Insights services. This FAQ section provides insights into how we transform raw data into actionable intelligence, helping you understand customer behavior, optimize marketing strategies, and drive business growth. Learn how our expertise in data analysis and customized reporting can empower your decision-making processes.
          </p>
            <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white
            bg-gradient-to-r from-brand-primary-light to-brand-primary-dark // <-- NEW: Gradient using custom colors
            hover:from-brand-primary-dark hover:to-brand-primary-darker // <-- NEW: Hover state using custom colors
            shadow-lg transition-all duration-300">
            GET STARTED WITH ANALYTICS
          </button>
        </div>

        {/* Right Column - FAQ Accordions */}
        <div className="space-y-4"> {/* Adds space between accordion items */}
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index} // Using index as key for simplicity with static array, but a unique ID would be better if data was dynamic
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}