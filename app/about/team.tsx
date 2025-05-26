"use client";
import React from 'react';
import {Image} from "@heroui/image";

const MeetThePeople = () => {
  return (
    <div className="py-16 w-full "> {/* Full width background for the section */}
      <div className="container mx-auto px-4 text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Say Hello to the Humans of Aligoo</h2> {/* Example Headline */}
      </div>
      <div className=" w-full mx-auto px-4 grid grid-cols-1 md:grid-cols-2"> {/* Removed gap-8 */}
        {/* First Row - Team Member 1 */}
        <div className="relative overflow-hidden"> {/* Removed shadow-md */}
          {/* Image Placeholder */}
          <div className="">
            {/* Replace this div with your image */}
            {/* Example image */}
            <Image
              src="/avatar-1.jpeg" // Replace with your image path
              alt="Team Member 1"
              width="100%" // Attempt to make it full width using percentage
              height="100%" // Attempt to make it full height using percentage
              style={{ objectFit: 'cover' }} // Add inline style for object-fit
              className="rounded-none"
            />
          </div>
          {/* Removed name and role overlay */}
        </div>

        {/* First Row - Team Member 2 */}
        <div className="relative  overflow-hidden"> {/* Removed shadow-md */}
          {/* Image Placeholder */}
          <div className="aspect-w-1 aspect-h-1">
            {/* Replace this div with your image */}
            {/* Example image */}
            <Image
              src="/avatar-2.jpeg" // Replace with your image path
              alt="Team Member 1"
              width="100%" // Attempt to make it full width using percentage
              height="100%" // Attempt to make it full height using percentage
              style={{ objectFit: 'cover' }} // Add inline style for object-fit
              className="rounded-none"
            />
          </div>
          {/* Removed name and role overlay */}
        </div>

        {/* Second Row - Team Member 3 */}
        <div className="relative  overflow-hidden"> {/* Removed shadow-md */}
          {/* Image Placeholder */}
          <div className="aspect-w-1 aspect-h-1">
            {/* Replace this div with your image */}
            {/* Example image */}
            <Image
              src="/avatar-3.jpeg" // Replace with your image path
              alt="Team Member 1"
              width="100%" // Attempt to make it full width using percentage
              height="100%" // Attempt to make it full height using percentage
              style={{ objectFit: 'cover' }} // Add inline style for object-fit
              className="rounded-none"
            />
          </div>
          {/* Removed name and role overlay */}
        </div>

        {/* Second Row - Team Member 4 */}
        <div className="relative  overflow-hidden"> {/* Removed shadow-md */}
          {/* Image Placeholder */}
          <div className="aspect-w-1 aspect-h-1">
            {/* Replace this div with your image */}
            <Image
              src="/avatar-4.jpeg" // Replace with your image path
              alt="Team Member 1"
              width="100%" // Attempt to make it full width using percentage
              height="100%" // Attempt to make it full height using percentage
              style={{ objectFit: 'cover' }} // Add inline style for object-fit
              className="rounded-none"
            />
          </div>
          {/* Removed name and role overlay */}
        </div>
      </div>
    </div>
  );
};

export default MeetThePeople;