import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
    site: 'https://r0d10nq.github.io',
    base: '/personal_portfolio',
    integrations: [
        tailwind()
    ],
    output: 'static'
});
