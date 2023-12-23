import "@/src/styles/globals.scss";
import Navbar from "@/src/components/Root/Header";
import Footer from "@/src/components/Root/Footer";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import MainProvider from "@/src/providers/MainProvider";

const font = Inter({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
	title: {
		default: "D2 Lore",
		template: "%s | D2L",
	},

	description: "The Destiny 2 Lore Library",
	metadataBase: new URL("https://d2lore.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="!scroll-smooth" suppressHydrationWarning>
			<body className={`${font.className} flex flex-col min-h-screen`}>
				<Toaster position="top-center" reverseOrder={false} />
				<MainProvider>
					<Navbar />
					<main className="relative flex-1">{children}</main>
					<Footer />
				</MainProvider>
			</body>
		</html>
	);
}
