import { ReactNode, ButtonHTMLAttributes } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  showArrow?: boolean;
  arrowDirection?: 'right' | 'down';
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  showArrow = false,
  arrowDirection = 'right',
  className = '',
  ...props 
}: ButtonProps) => {
  const baseStyles = 'group relative px-8 py-3 rounded-full font-medium text-white overflow-hidden transition-all border';
  
  const variantStyles = {
    primary: 'bg-white/10 backdrop-blur-md border-white/10 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:border-violet-500/50',
    secondary: 'bg-white/10 hover:bg-white/20 border-white/10',
  };

  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/50 to-blue-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      <span className="relative flex items-center gap-2">
        {children}
        {showArrow && (
          arrowDirection === 'down' ? (
            <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
          ) : (
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          )
        )}
      </span>
    </button>
  );
};

