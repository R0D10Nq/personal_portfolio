<script>
  import { onMount } from 'svelte';
  
  export let name = '';
  export let level = 0;
  export let delay = 0;
  
  let visible = false;
  let currentLevel = 0;
  let element;
  
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !visible) {
            visible = true;
            setTimeout(() => {
              animateLevel();
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(element);
    
    return () => observer.disconnect();
  });
  
  function animateLevel() {
    const duration = 1000;
    const start = performance.now();
    
    function update(timestamp) {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      currentLevel = Math.round(level * eased);
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    
    requestAnimationFrame(update);
  }
</script>

<div bind:this={element} class="mb-4">
  <div class="flex justify-between items-center mb-1">
    <span class="text-sm text-gray-300">{name}</span>
    <span class="text-xs text-neon-pink font-mono">{currentLevel}%</span>
  </div>
  <div class="h-2 bg-cyber-gray rounded-full overflow-hidden">
    <div 
      class="h-full bg-gradient-to-r from-neon-pink to-neon-purple rounded-full transition-all duration-1000 ease-out"
      style="width: {currentLevel}%"
    ></div>
  </div>
</div>
