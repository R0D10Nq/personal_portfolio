<script>
  export let text = '';
  export let tag = 'span';
  
  let glitching = false;
  let glitchInterval;
  
  function startGlitch() {
    glitching = true;
    glitchInterval = setInterval(() => {
      glitching = !glitching;
    }, 100);
    
    setTimeout(() => {
      clearInterval(glitchInterval);
      glitching = false;
    }, 500);
  }
</script>

<svelte:element 
  this={tag}
  class="glitch-text relative inline-block cursor-pointer"
  class:glitching
  on:mouseenter={startGlitch}
  on:click={startGlitch}
  data-text={text}
>
  {text}
</svelte:element>

<style>
  .glitch-text {
    position: relative;
  }
  
  .glitch-text::before,
  .glitch-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  
  .glitch-text::before {
    color: #ff006e;
    z-index: -1;
  }
  
  .glitch-text::after {
    color: #00d9ff;
    z-index: -1;
  }
  
  .glitching::before {
    opacity: 0.8;
    animation: glitch-anim-1 0.1s infinite linear alternate-reverse;
  }
  
  .glitching::after {
    opacity: 0.8;
    animation: glitch-anim-2 0.1s infinite linear alternate-reverse;
  }
  
  @keyframes glitch-anim-1 {
    0% { clip-path: inset(40% 0 50% 0); transform: translate(-3px, -3px); }
    20% { clip-path: inset(20% 0 60% 0); transform: translate(3px, 3px); }
    40% { clip-path: inset(70% 0 10% 0); transform: translate(-3px, 3px); }
    60% { clip-path: inset(10% 0 80% 0); transform: translate(3px, -3px); }
    80% { clip-path: inset(50% 0 30% 0); transform: translate(-3px, -3px); }
    100% { clip-path: inset(30% 0 50% 0); transform: translate(3px, 3px); }
  }
  
  @keyframes glitch-anim-2 {
    0% { clip-path: inset(60% 0 20% 0); transform: translate(3px, 3px); }
    20% { clip-path: inset(10% 0 70% 0); transform: translate(-3px, -3px); }
    40% { clip-path: inset(80% 0 5% 0); transform: translate(3px, -3px); }
    60% { clip-path: inset(5% 0 85% 0); transform: translate(-3px, 3px); }
    80% { clip-path: inset(45% 0 35% 0); transform: translate(3px, 3px); }
    100% { clip-path: inset(25% 0 55% 0); transform: translate(-3px, -3px); }
  }
</style>
