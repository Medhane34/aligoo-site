"use client";

import { Button } from "@heroui/button"; // ✅ Correct
import { title, subtitle, button } from "@/components/primitives"; // ✅ Correct

export default function HeroSection() {
  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark mt-[-105px] p-9">
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center overflow-hidden ">
        <section className="z-20 flex flex-col items-center justify-center gap-[18px] sm:gap-6">
          <Button
            className="h-9 overflow-hidden border-1 px-[18px] py-2 text-small font-normal leading-5"
            endContent={
              <span className="pointer-events-none flex h-[22px] w-[22px] items-center justify-center rounded-full" />
            }
            radius="full"
            variant="bordered"
          >
            New onboarding experience
          </Button>

          <div className="text-center text-[clamp(40px,10vw,44px)] font-bold leading-[0.8] tracking-tighter sm:text-[64px]">
            <div className="relative">
              <div className="inline-block max-w-xl text-center text-text-light dark:text-text-dark justify-center relative z-10">
                <span className={title()}>Make&nbsp;</span>
                <span className={title({ color: "violet" })}>
                  beautiful&nbsp;
                </span>
                <br />
                <span className={title()}>
                  websites regardless of your design experience.
                </span>
              </div>
            </div>
          </div>

          <p className="text-center font-normal leading-7 text-default-500 dark:text-yellow sm:w-[466px] sm:text-[18px]">
            Acme makes running global teams simple. HR, Payroll, International
            Employment, contractor management and more.
          </p>

          <div className="flex flex-row items-center justify-center gap-6 sm:flex-row">
            <Button
              className="w-[163px] h-10 px-[16px] py-[10px] text-small font-medium leading-5 bg-button-primary-light"
              radius="full"
            >
              Get Started
            </Button>
            <Button
              className="h-10 w-[163px] border-1 border-default-100 px-[16px] py-[10px] text-small font-medium leading-5"
              endContent={
                <span className="pointer-events-none flex h-[22px] w-[22px] items-center justify-center rounded-full bg-default-100" />
              }
              radius="full"
              variant="bordered"
            >
              See our plans
            </Button>
          </div>
        </section>

        {/*  <div className="pointer-events-none absolute inset-0 top-[-25%] z-10 scale-150 select-none sm:scale-125">
          <FadeInImage
            alt="Gradient background"
            src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/backgrounds/bg-gradient.png"
          />
        </div>

      */}
      </main>
    </div>
  );
}
