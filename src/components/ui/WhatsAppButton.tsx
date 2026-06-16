'use client';

import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
  variant?: 'default' | 'outline';
}

const sizeClasses = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-5 text-sm gap-2',
  lg: 'h-12 px-7 text-base gap-2.5',
};

const iconSizes = {
  sm: 'size-3.5',
  md: 'size-4.5',
  lg: 'size-5',
};

export default function WhatsAppButton({
  message,
  size = 'md',
  className,
  label = 'WhatsApp',
  variant = 'default',
}: WhatsAppButtonProps) {
  const link = getWhatsAppLink(message);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <Button
        className={cn(
          variant === 'default'
            ? 'bg-[#22C55E] hover:bg-[#16A34A] text-white whatsapp-pulse shadow-lg shadow-[#22C55E]/20'
            : 'border-[#22C55E]/40 text-[#22C55E] hover:bg-[#22C55E]/10 hover:border-[#22C55E]/60',
          sizeClasses[size],
          'font-medium rounded-xl',
          className
        )}
        variant={variant === 'outline' ? 'outline' : 'default'}
        size="default"
        asChild
      >
        <span>
          <MessageCircle className={iconSizes[size]} />
          {label}
        </span>
      </Button>
    </a>
  );
}
