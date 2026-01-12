import Link from "next/link";

type Variant = "primary" | "secondary" | "outline" | "link" | "popover";

type ButtonProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string; 
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  children,
  className,
  variant = "primary",
  href,
  onClick,
  type = "button",
} : ButtonProps ) {
  const baseStyles = `
    inline-flex items-center justify-center
    px-8 py-2
    font-semibold
    transition-all
    active:scale-95
  `;

  const variants = {
    primary: `
      bg-green-900 text-white
      hover:bg-green-500
      rounded-3xl
      shadow-lg
      hover:scale-105
    `,
    secondary: `
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
      hover:text-white
      underline-offset-4
      hover:underline
      px-0 py-0
    `,
    popover:`
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
          className={`${className}`}
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
        type={type}
        onClick={onClick}
        className={`${className}`}
      >
        {children}
      </button>  
    )
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
