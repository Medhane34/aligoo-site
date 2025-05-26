"use client"
import { useState, useEffect } from "react";

interface FadeInImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const FadeInImage: React.FC<FadeInImageProps> = ({ src, alt, className = "", ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
  }, [src]);

  return (
    <img
      src={src}
      alt={alt}
      className={`transition-opacity duration-700 ease-in-out ${
        isLoaded ? "opacity-100" : "opacity-0"
      } ${className}`}
      {...props}
    />
  );
};

export default FadeInImage;