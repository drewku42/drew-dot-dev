import { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
  variant?: 'default' | 'tech' | 'blog';
  className?: string;
}

export const Tag = ({ children, variant = 'default', className = '' }: TagProps) => {
  const baseStyles = 'px-3 py-1 text-xs font-mono rounded';
  
  const variantStyles = {
    default: 'bg-white/5 border border-white/10 text-gray-300',
    tech: 'bg-white/5 border border-white/10 text-gray-300',
    blog: 'text-violet-400 bg-violet-500/10',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

