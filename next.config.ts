import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/signin",
  webpack(config) {
    config.module.rules.push({
      /*test: /\.s[ac]ss$/i,*/ test: /\.(scss|sass|less|css)$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "sass-loader",
          options: {
            // Options for Sass compilation
          },
        },
        "sass-loader",
      ],
    });
    return config;
  },

  async rewrites() {
    return [
      {
        source: "/postik",
        destination: "http://localhost:3000/postik",
      },
      {
        source: "/postik/:path*",
        destination: "http://localhost:3000/postik/:path*",
      },
    ];
  },

  experimental: {
    taint: true,
    turbo: {
      resolveExtensions: [
        ".mdx",
        ".tsx",
        ".ts",
        ".jsx",
        ".js",
        ".mjs",
        ".json",
      ],
    },
  },
};

export default nextConfig;
