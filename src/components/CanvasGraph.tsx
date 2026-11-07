import { useEffect, useRef } from 'react';

export default function CanvasGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      // Make canvas responsive to its container
      const width = container.clientWidth;
      const height = 400;
      canvas.width = width;
      canvas.height = height;

      const data = [20, 45, 30, 80, 50, 95, 70, 110, 60, 130];
      const padding = 40;
      const graphWidth = width - padding * 2;
      const graphHeight = height - padding * 2;

      ctx.clearRect(0, 0, width, height);

      // Grid
      ctx.strokeStyle = '#2a2a35';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const y = padding + (graphHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
      }

      // Line
      ctx.beginPath();
      ctx.strokeStyle = '#5e5ce6';
      ctx.lineWidth = 3;
      ctx.lineJoin = 'round';

      data.forEach((val, index) => {
        const x = padding + (graphWidth / (data.length - 1)) * index;
        const y = height - padding - (val / 150) * graphHeight;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(94, 92, 230, 0.4)');
      gradient.addColorStop(1, 'rgba(94, 92, 230, 0)');
      ctx.lineTo(width - padding, height - padding);
      ctx.lineTo(padding, height - padding);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Points
      data.forEach((val, index) => {
        const x = padding + (graphWidth / (data.length - 1)) * index;
        const y = height - padding - (val / 150) * graphHeight;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.strokeStyle = '#5e5ce6';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    };

    draw();
    const resizeObserver = new ResizeObserver(() => draw());
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '400px', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}