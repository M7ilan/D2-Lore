/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.bungie.net",
			},
		],
	},
};

module.exports = nextConfig;
