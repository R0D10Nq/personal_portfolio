<script>
  import { onMount } from 'svelte';
  
  export let texts = ['Django', 'FastAPI', 'PostgreSQL', 'Redis', 'Celery'];
  export let typingSpeed = 100;
  export let deletingSpeed = 50;
  export let pauseTime = 2000;
  
  let displayText = '';
  let currentIndex = 0;
  let isDeleting = false;
  
  onMount(() => {
    type();
  });
  
  function type() {
    const currentText = texts[currentIndex];
    
    if (!isDeleting) {
      displayText = currentText.substring(0, displayText.length + 1);
      
      if (displayText === currentText) {
        setTimeout(() => {
          isDeleting = true;
          type();
        }, pauseTime);
        return;
      }
    } else {
      displayText = currentText.substring(0, displayText.length - 1);
      
      if (displayText === '') {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % texts.length;
      }
    }
    
    setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
  }
</script>

<span class="font-mono text-neon-blue">
  {displayText}<span class="animate-pulse text-neon-pink">|</span>
</span>
