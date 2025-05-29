/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dsl-dev.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'b-company.jp',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'panoquangcao.vn',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dienmayquanghanh.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bizweb.dktcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.hoanghamobile.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.tgdd.vn',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'donghodinhvigps.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'link.to',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'quatmitsubishi.vn',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-img-v2.mybota.vn',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'venko.vn',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
