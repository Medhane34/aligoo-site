"use client";
import React from "react";
import Image from "next/image";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
export default function AreWeMatch() {
  return (
    <div className="container grid grid-cols-2">
      <Image
        alt="Are We a Match?"
        className="w-full h-auto object-cover rounded-lg shadow-lg col-span-2 md:col-span-1"
        height={200}
        src="/page-content-images/tik-tok-arewematch.png"
        width={200}
      />

      {/* right column */}
      <div className="flex flex-col px-4">
        <div className="flex w-full flex-col">
          <Tabs aria-label="Options" isVertical={true}>
            <Tab
              key="✅ You’re a Great Fit If:"
              title="✅ You’re a Great Fit If:"
            >
              <Card>
                <CardBody>
                  <li>
                    You’ve got a product/service that solves a clear problem 🔍
                  </li>
                  <li>
                    You’re open to letting us get creative with content & angles
                    🎬
                  </li>
                  <li>
                    You’re ready to invest in data-driven paid traffic that
                    scales 📈
                  </li>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="❌ It’s Not for You If:" title="❌ It’s Not for You If:">
              <Card>
                <CardBody>
                  <li>You want a “set it and forget it” ad 🤷</li>
                  <li>
                    You’re afraid of looking too different from competitors
                  </li>
                  <li>You want results, but don’t want to experiment</li>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
