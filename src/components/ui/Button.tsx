"use client";

import Link from "next/link";

type Variant = "primary" | "secondary" | "outline" | "link" | "popover" | "none";

type ButtonProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string; 
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export default function  Button({
  children,
  className,
  variant = "primary",
  href,
  onClick,
  type = "button",
  disabled,
} : ButtonProps ) {
  const baseStyles = `
    px-8 py-2
    font-semibold
    transition-all
  `;

  const variants = {
    primary: `
      inline-flex items-center justify-center
      bg-green-900 text-white
      hover:bg-green-500
      rounded-3xl
      shadow-lg
      hover:scale-105
    `,
    secondary: `
      inline-flex items-center justify-center
      bg-white text-black
      rounded-3xl
      border border-black
      hover:bg-gray-100
    `,
    outline: `
      border border-orange-600
      text-orange-600
      hover:bg-orange-600
      hover:text-white
    `,
    link: `
      inline-flex items-center justify-center
      hover:text-white
      underline-offset-4
      hover:underline
      px-0 py-0
    `,
    popover:`
      inline-flex items-center justify-center
      text-white
      underline-offset-4
      hover:underline
      px-0 py-0
    `,
    none: ``
  };

  if (href) {
    if(className){
      return(
        <Link
          href={href}
          className={`${baseStyles} ${variants[variant]} ${className} `}
          onClick={onClick}
        >
        {children}
        </Link>  
      )
    }
    return (
      <Link
        href={href}
        className={`${baseStyles} ${variants[variant]}`}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  if(className){
    return(
      <button
        disabled = {disabled}
        type={type}
        onClick={onClick}
        className={`${baseStyles} ${className} ${variants[variant]}`}
      >
        {children}
      </button>  
    )
  }
  return (
    <button
      disabled = {disabled}
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
