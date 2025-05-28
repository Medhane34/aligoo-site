// components/ui/AccordionItem.tsx
"use client"; // This component needs to be client-side for interactivity (useState, onClick)

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid'; // You might need to install Heroicons: npm install @heroicons/react

interface AccordionItemProps {
  question: string;
  answer: string;
}

export default function AccordionItem({ question, answer }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-700 rounded-xl overflow-hidden shadow-md">
      <button
        className="flex justify-between items-center w-full p-6 text-left text-lg font-semibold text-white focus:outline-none"
        onClick={toggleAccordion}
        aria-expanded={isOpen}
      >
        <span className="text-sm xs:text-subheading">{question}</span>
        <ChevronDownIcon
          className={`w-6 h-6 text-gray-400 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* Answer content, slides down/up */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden text-body">
          <p className="p-6 pt-0 text-gray-300 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}