/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                // base dark
                'cyber-black': '#0a0a0a',
                'cyber-dark': '#1a1a1a',
                'cyber-gray': '#2a2a2a',

                // neon accents
                'neon-pink': '#ff006e',
                'neon-blue': '#00d9ff',
                'neon-purple': '#7209b7',
                'neon-green': '#39ff14',

                // samurai tones
                'samurai-red': '#cc0000',
                'katana-gold': '#d4af37',
                'sakura': '#ffb7c5'
            },
            fontFamily: {
                'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
                'sans': ['Inter', 'system-ui', 'sans-serif']
            },
            animation: {
                'glitch': 'glitch 2s infinite',
                'flicker': 'flicker 3s infinite',
                'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
                'matrix-fall': 'matrix-fall 8s linear infinite',
                'scan-line': 'scan-line 4s linear infinite',
                'float': 'float 6s ease-in-out infinite'
            },
            keyframes: {
                glitch: {
                    '0%, 100%': { transform: 'translate(0)' },
                    '20%': { transform: 'translate(-2px, 2px)' },
                    '40%': { transform: 'translate(-2px, -2px)' },
                    '60%': { transform: 'translate(2px, 2px)' },
                    '80%': { transform: 'translate(2px, -2px)' }
                },
                flicker: {
                    '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: '1' },
                    '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.4' }
                },
                'pulse-neon': {
                    '0%, 100%': {
                        boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor'
                    },
                    '50%': {
                        boxShadow: '0 0 10px currentColor, 0 0 25px currentColor, 0 0 40px currentColor'
                    }
                },
                'matrix-fall': {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100vh)' }
                },
                'scan-line': {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' }
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' }
                }
            },
            backgroundImage: {
                'grid-pattern': 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                'hex-pattern': 'radial-gradient(circle at center, transparent 0%, #0a0a0a 100%)'
            }
        }
    },
    plugins: []
}
