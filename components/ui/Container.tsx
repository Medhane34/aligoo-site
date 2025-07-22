// components/ui/Container.tsx
import React, { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

const Container = ({ children, className = "" }: ContainerProps) => (
  <div className={`container mx-auto px-4 ${className}`}>
    {children}
  </div>
);

export default Container;
