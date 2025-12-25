import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
    site: 'https://r0d10nq.github.io',
    base: '/personal_portfolio',
    integrations: [
        svelte(),
        tailwind()
    ],
    output: 'static'
});
