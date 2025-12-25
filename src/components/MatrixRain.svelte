<script>
  import { onMount, onDestroy } from 'svelte';
  
  let canvas;
  let ctx;
  let animationId;
  let columns = [];
  
  const chars = '侍刀力心道武士龍虎風雷火水金木土天地人和平戦勝負命運縁夢希望光闇01アイウエオカキクケコサシスセソ';
  const fontSize = 14;
  const speed = 0.5;
  
  onMount(() => {
    ctx = canvas.getContext('2d');
    resize();
    animate();
    window.addEventListener('resize', resize);
  });
  
  onDestroy(() => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
  });
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const columnCount = Math.floor(canvas.width / fontSize);
    columns = Array(columnCount).fill(0).map(() => ({
      y: Math.random() * canvas.height,
      speed: 0.3 + Math.random() * 0.7
    }));
  }
  
  function animate() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
    
    columns.forEach((col, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      
      // gradient color based on position
      const hue = (col.y / canvas.height) * 60 + 300; // pink to blue
      ctx.fillStyle = `hsla(${hue}, 100%, 60%, 0.8)`;
      
      ctx.fillText(char, x, col.y);
      
      // dim trail
      ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.3)`;
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, col.y - fontSize);
      
      col.y += fontSize * col.speed;
      
      if (col.y > canvas.height && Math.random() > 0.98) {
        col.y = 0;
        col.speed = 0.3 + Math.random() * 0.7;
      }
    });
    
    animationId = requestAnimationFrame(animate);
  }
</script>

<canvas 
  bind:this={canvas}
  class="fixed inset-0 pointer-events-none z-0 opacity-30"
></canvas>
