import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CoinLens — Crypto Finance Platform',
    short_name: 'CoinLens',
    description: 'Real-time crypto prices, market data, verified news, and educational resources.',
    start_url: '/en',
    display: 'standalone',
    background_color: '#0B1426',
    theme_color: '#00D4AA',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
