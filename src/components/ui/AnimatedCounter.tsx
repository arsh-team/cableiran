'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useInView, useSpring, useMotionValue } from 'framer-motion';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

function getSnapshot(): boolean {
  return typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
}

function getServerSnapshot(): boolean {
  return false;
}

function subscribe(callback: () => void): () => void {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

export default function AnimatedCounter({ target, duration = 2, suffix = '+', className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue]);

  if (prefersReducedMotion) {
    return (
      <span className={className}>
        {target}{suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {displayValue}{suffix}
    </span>
  );
}
