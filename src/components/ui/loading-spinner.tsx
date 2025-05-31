import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  className?: string;
}

export const LoadingSpinner = ({
  size = 24,
  className = '',
  ...props
}: LoadingSpinnerProps) => {
  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      {...props}
    >
      <Loader2 
        className="animate-spin text-primary" 
        style={{ width: size, height: size }}
      />
    </div>
  );
};

// Full page loading spinner
export const FullPageSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
    <LoadingSpinner size={48} className="text-primary" />
  </div>
);
