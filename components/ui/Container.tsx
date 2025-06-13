// components/ui/Container.tsx
import React, { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export const Container = ({ children, className = "" }: ContainerProps) => (
  <div
    className={`
      w-full
      mx-auto
      px-4
      xs:px-6
      sm:px-8
      md:px-10
      lg:px-12
      xl:px-0
      max-w-full
      xs:max-w-screen-xs
      sm:max-w-screen-sm
      md:max-w-screen-md
      lg:max-w-screen-lg
      xl:max-w-screen-xl
      bg-background-light dark:bg-background-dark -> tried to add this class but not working
      ${className}
    `}
  >
    {children}
  </div>
);

export default Container;
