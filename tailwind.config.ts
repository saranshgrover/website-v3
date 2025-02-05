import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '0%': { 
            backgroundPosition: '-200% 0',
            opacity: 0.5
          },
          '100%': { 
            backgroundPosition: '200% 0',
            opacity: 0.7
          }
        }
      },
      animation: {
        shimmer: 'shimmer 4s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    }
  }
};

export default config; 