/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: { unoptimized: true },
  // Las guías se leen de content/guias en tiempo de ejecución: hay que incluirlas en el despliegue.
  outputFileTracingIncludes: {
    '/**': ['./content/**/*'],
  },
  async redirects() {
    // Artículos de /aprende que repetían una lección de /academia: se queda la lección.
    const merged = {
      'que-es-bitcoin': '/academia/bitcoin',
      'como-funciona-blockchain': '/academia/blockchain',
      'wallets-exchanges-stablecoins': '/academia/wallet',
      'defi-finanzas-descentralizadas': '/academia/defi',
      'ethereum-y-altcoins': '/academia/ethereum',
      'regulacion-cripto-global': '/aprende/mica-regulacion-cripto-espana',
    }
    return Object.entries(merged).map(([slug, destination]) => ({
      source: `/aprende/${slug}`,
      destination,
      permanent: true,
    }))
  },
};

module.exports = nextConfig;
