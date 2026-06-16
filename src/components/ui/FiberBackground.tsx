'use client';

import { useEffect, useRef, useCallback, useSyncExternalStore } from 'react';

interface LightStream {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  color: string;
  opacity: number;
  width: number;
}

function getReducedMotionSnapshot(): boolean {
  return typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

function subscribeReducedMotion(callback: () => void): () => void {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

export default function FiberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const streamsRef = useRef<LightStream[]>([]);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const createStream = useCallback((canvas: HTMLCanvasElement): LightStream => {
    const colors = [
      'rgba(13, 148, 136, ',
      'rgba(13, 148, 136, ',
      'rgba(6, 182, 212, ',
      'rgba(217, 119, 6, ',
      'rgba(20, 184, 166, ',
    ];
    const angle = (Math.random() * 30 + 30) * (Math.PI / 180);
    return {
      x: Math.random() * canvas.width * 1.5 - canvas.width * 0.25,
      y: -Math.random() * canvas.height * 0.3,
      length: Math.random() * 140 + 80,
      speed: Math.random() * 1.2 + 0.4,
      angle,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.15 + 0.05,
      width: Math.random() * 1.5 + 0.5,
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const streamCount = 18;
    streamsRef.current = Array.from({ length: streamCount }, () => {
      const stream = createStream(canvas);
      stream.y = Math.random() * canvas.offsetHeight;
      return stream;
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      streamsRef.current.forEach((stream, i) => {
        const endX = stream.x + Math.cos(stream.angle) * stream.length;
        const endY = stream.y + Math.sin(stream.angle) * stream.length;

        const gradient = ctx.createLinearGradient(stream.x, stream.y, endX, endY);
        gradient.addColorStop(0, stream.color + '0)');
        gradient.addColorStop(0.3, stream.color + stream.opacity + ')');
        gradient.addColorStop(0.7, stream.color + stream.opacity + ')');
        gradient.addColorStop(1, stream.color + '0)');

        ctx.beginPath();
        ctx.moveTo(stream.x, stream.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = stream.width;
        ctx.stroke();

        const midX = stream.x + Math.cos(stream.angle) * stream.length * 0.5;
        const midY = stream.y + Math.sin(stream.angle) * stream.length * 0.5;
        const glowGradient = ctx.createRadialGradient(midX, midY, 0, midX, midY, 8);
        glowGradient.addColorStop(0, stream.color + (stream.opacity * 1.2) + ')');
        glowGradient.addColorStop(1, stream.color + '0)');
        ctx.beginPath();
        ctx.arc(midX, midY, 8, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        stream.x += Math.cos(stream.angle) * stream.speed;
        stream.y += Math.sin(stream.angle) * stream.speed;

        if (stream.y > canvas.offsetHeight + 50 || stream.x > canvas.offsetWidth + 200) {
          streamsRef.current[i] = createStream(canvas);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [prefersReducedMotion, createStream]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
