/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.bungie.net",
			},
		],
	},
};

module.exports = nextConfig;
