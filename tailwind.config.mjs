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
                'cyber-light': '#3a3a3a',

                // neon accents
                'neon-pink': '#ff006e',
                'neon-blue': '#00d9ff',
                'neon-purple': '#7209b7',
                'neon-green': '#39ff14',
                'neon-yellow': '#ffff00',
                'neon-orange': '#ff6b35',

                // samurai tones
                'samurai-red': '#cc0000',
                'katana-gold': '#d4af37',
                'sakura': '#ffb7c5',
                'bamboo': '#7cb518'
            },
            fontFamily: {
                'mono': ['JetBrains Mono', 'Fira Code', 'Space Mono', 'monospace'],
                'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                'display': ['Orbitron', 'JetBrains Mono', 'monospace']
            },
            fontSize: {
                'xxs': ['0.625rem', { lineHeight: '0.875rem' }],
                '10xl': ['10rem', { lineHeight: '1' }]
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem'
            },
            animation: {
                'glitch': 'glitch 2s infinite',
                'glitch-fast': 'glitch 0.3s infinite',
                'flicker': 'flicker 3s infinite',
                'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'matrix-fall': 'matrix-fall 8s linear infinite',
                'scan-line': 'scan-line 4s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'spin-slow': 'spin 8s linear infinite',
                'bounce-slow': 'bounce 3s infinite',
                'fade-in': 'fadeIn 0.5s ease-out',
                'fade-in-up': 'fadeInUp 0.6s ease-out',
                'slide-in-left': 'slideInLeft 0.5s ease-out',
                'slide-in-right': 'slideInRight 0.5s ease-out',
                'text-shimmer': 'textShimmer 2s ease-in-out infinite'
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
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' }
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' }
                },
                textShimmer: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' }
                }
            },
            backgroundImage: {
                'grid-pattern': 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                'hex-pattern': 'radial-gradient(circle at center, transparent 0%, #0a0a0a 100%)',
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'neon-glow': 'linear-gradient(90deg, #ff006e, #7209b7, #00d9ff, #ff006e)'
            },
            boxShadow: {
                'neon-pink': '0 0 5px #ff006e, 0 0 20px #ff006e, 0 0 40px #ff006e',
                'neon-blue': '0 0 5px #00d9ff, 0 0 20px #00d9ff, 0 0 40px #00d9ff',
                'neon-purple': '0 0 5px #7209b7, 0 0 20px #7209b7, 0 0 40px #7209b7',
                'inner-neon': 'inset 0 0 20px rgba(255, 0, 110, 0.3)'
            },
            backdropBlur: {
                xs: '2px'
            },
            transitionDuration: {
                '400': '400ms'
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: 'none',
                        color: '#d1d5db',
                        a: {
                            color: '#ff006e',
                            '&:hover': {
                                color: '#00d9ff'
                            }
                        }
                    }
                }
            }
        }
    },
    plugins: [
        require('@tailwindcss/typography')
    ]
}
