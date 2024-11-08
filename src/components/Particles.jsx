import React, { useEffect, useRef } from 'react'

const Particles = ({ className, quantity, ease, color }) => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      let animationFrameId;
  
      const resizeCanvas = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };
  
      const createParticles = () => {
        particles.current = Array.from({ length: quantity }, () => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
        }));
      };
  
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.current.forEach((particle) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
  
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
  
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        });
        animationFrameId = requestAnimationFrame(animate);
      };
  
      resizeCanvas();
      createParticles();
      animate();
  
      window.addEventListener("resize", resizeCanvas);
  
      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", resizeCanvas);
      };
    }, [quantity, color]);
  
    return <canvas ref={canvasRef} className={className} />;
  };

export default Particles;

