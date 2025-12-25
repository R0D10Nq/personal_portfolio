<script>
  import { onMount, onDestroy } from 'svelte';
  
  let canvas;
  let ctx;
  let animationId;
  let mouseX = 0;
  let mouseY = 0;
  let time = 0;
  
  const gridSize = 50;
  
  onMount(() => {
    ctx = canvas.getContext('2d');
    resize();
    animate();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouse);
  });
  
  onDestroy(() => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
    window.removeEventListener('mousemove', handleMouse);
  });
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  function handleMouse(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
  
  function animate() {
    time += 0.01;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // draw grid
    ctx.strokeStyle = 'rgba(255, 0, 110, 0.1)';
    ctx.lineWidth = 1;
    
    // vertical lines
    for (let x = 0; x <= canvas.width; x += gridSize) {
      const dist = Math.abs(x - mouseX);
      const intensity = Math.max(0, 1 - dist / 300);
      const wave = Math.sin(time * 2 + x * 0.01) * 2;
      
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 0, 110, ${0.05 + intensity * 0.3})`;
      ctx.moveTo(x + wave, 0);
      ctx.lineTo(x + wave, canvas.height);
      ctx.stroke();
    }
    
    // horizontal lines
    for (let y = 0; y <= canvas.height; y += gridSize) {
      const dist = Math.abs(y - mouseY);
      const intensity = Math.max(0, 1 - dist / 300);
      const wave = Math.sin(time * 2 + y * 0.01) * 2;
      
      ctx.beginPath();
      ctx.strokeStyle = `rgba(0, 217, 255, ${0.05 + intensity * 0.3})`;
      ctx.moveTo(0, y + wave);
      ctx.lineTo(canvas.width, y + wave);
      ctx.stroke();
    }
    
    // glow at intersections near mouse
    for (let x = 0; x <= canvas.width; x += gridSize) {
      for (let y = 0; y <= canvas.height; y += gridSize) {
        const dx = x - mouseX;
        const dy = y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          const intensity = 1 - dist / 150;
          ctx.beginPath();
          ctx.arc(x, y, 2 + intensity * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 0, 110, ${intensity * 0.8})`;
          ctx.fill();
          
          // glow
          ctx.beginPath();
          ctx.arc(x, y, 5 + intensity * 10, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 0, 110, ${intensity * 0.2})`;
          ctx.fill();
        }
      }
    }
    
    animationId = requestAnimationFrame(animate);
  }
</script>

<canvas 
  bind:this={canvas}
  class="fixed inset-0 pointer-events-none z-0"
></canvas>
