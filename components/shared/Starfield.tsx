import { useRef, useEffect } from 'react';
import { Star, StarfieldProps } from '@/types';
import { STARFIELD_CONFIG, COLORS } from '@/constants';

export const Starfield = ({ isWarping }: StarfieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    
    // Star properties
    const stars: Star[] = [];
    const { count, depth } = STARFIELD_CONFIG;
    
    // Initialize stars
    for (let i = 0; i < count; i++) {
      stars.push({
        x: (Math.random() - 0.5) * window.innerWidth * 2,
        y: (Math.random() - 0.5) * window.innerHeight * 2,
        z: Math.random() * depth,
        prevZ: 0
      });
    }

    const render = () => {
      // Handle resize
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      // Clear screen
      ctx.fillStyle = COLORS.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Center of screen
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Warp speed factor
      const speed = isWarping ? STARFIELD_CONFIG.warpSpeed : STARFIELD_CONFIG.normalSpeed;

      // Draw stars
      stars.forEach(star => {
        // Move star closer
        star.z -= speed;

        // Reset if passed camera
        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * window.innerWidth * 2;
          star.y = (Math.random() - 0.5) * window.innerHeight * 2;
          star.z = depth;
          star.prevZ = depth;
        }

        // Projection math
        const k = STARFIELD_CONFIG.projectionConstant / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        // Draw
        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          const size = (1 - star.z / depth) * (isWarping ? 4 : 2.5);
          const shade = Math.floor((1 - star.z / depth) * 255);
          
          ctx.beginPath();
          
          if (isWarping) {
            // Trail effect
            const prevK = STARFIELD_CONFIG.projectionConstant / (star.z + speed * 2);
            const prevPx = star.x * prevK + cx;
            const prevPy = star.y * prevK + cy;
            
            ctx.moveTo(px, py);
            ctx.lineTo(prevPx, prevPy);
            ctx.strokeStyle = `rgba(167, 139, 250, ${shade/255})`;
            ctx.lineWidth = size;
            ctx.stroke();
          } else {
            // Dot
            ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
            ctx.arc(px, py, size / 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isWarping]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: COLORS.background }}
    />
  );
};

