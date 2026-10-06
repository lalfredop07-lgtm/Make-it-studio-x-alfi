import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Dos únicas calidades en todo el proyecto: 76 por defecto, 82 para las
    // piezas de portada. Cada valor extra multiplica las variantes a generar.
    qualities: [76, 82],
    // Anchos alineados con las columnas reales del grid editorial.
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920, 2048],
    imageSizes: [96, 160, 240, 320, 420, 560, 720],
  },
  experimental: {
    optimizePackageImports: ["motion"],
  },
};

export default nextConfig;
