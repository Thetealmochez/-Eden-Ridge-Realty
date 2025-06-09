
import React, { useState } from 'react';
import { X, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationBannerProps {
  type: 'info' | 'warning' | 'success';
  message: string;
  dismissible?: boolean;
  className?: string;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({
  type,
  message,
  dismissible = true,
  className
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const icons = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle
  };

  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    success: 'bg-green-50 border-green-200 text-green-800'
  };

  const Icon = icons[type];

  return (
    <div className={cn(
      "border-l-4 p-4 relative",
      styles[type],
      className
    )}>
      <div className="flex items-center">
        <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
        <p className="text-sm font-medium flex-1">{message}</p>
        {dismissible && (
          <button
            onClick={() => setIsVisible(false)}
            className="ml-3 p-1 hover:bg-black/10 rounded"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationBanner;
