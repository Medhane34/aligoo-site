"use client";
import React from 'react';
import { ArrowRightIcon, Cog6ToothIcon, CpuChipIcon, LightBulbIcon, UserGroupIcon } from '@heroicons/react/24/outline'; // Example icons from Heroicons

const values = () => {
  return (
    <div className="py-16 bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* First Row */}
          <div className="row-span-1">
            <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">High-impact services</h2>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros vel ipsum elementum.
            </p>
            <button className="bg-button-light dark:bg-button-primary-dark text-white font-semibold py-3 px-6 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
              Get in touch
            </button>
          </div>

          {/* First Row - Card 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
            <div>
              <CpuChipIcon className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Project management</h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-gray-700 mt-4 self-end" />
          </div>

          {/* First Row - Card 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
            <div>
              <LightBulbIcon className="h-8 w-8 text-orange-500 mb-2" />
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Process development</h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-gray-700 mt-4 self-end" />
          </div>

          {/* Second Row - Card 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
            <div>
              <Cog6ToothIcon className="h-8 w-8 text-purple-500 mb-2" />
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Operations & delegations</h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-gray-700 mt-4 self-end" />
          </div>

          {/* Second Row - Card 4 */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
            <div>
              <UserGroupIcon className="h-8 w-8 text-red-500 mb-2" />
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Human resources</h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-gray-700 mt-4 self-end" />
          </div>

          {/* Second Row - Card 5 */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
            <div>

              <h3 className="font-semibold text-lg text-gray-900 mb-2">Quality assurance</h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-gray-700 mt-4 self-end" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default values;