import "./globals.css";
// import Navbar from "@/src/components/Navbar";
// import Footer from "@/src/components/Footer";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Roboto_Flex } from "next/font/google";
import { ReactNode } from "react";
import MainProvider from "@/src/providers/MainProvider";

const font = Roboto_Flex({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
	title: {
		default: "D2 Lore",
		template: "%s | D2L",
	},
	description: "A Destiny 2 Lore Library",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" className="!scroll-smooth" suppressHydrationWarning>
			<body className={`${font.className} bg-white dark:bg-OpenColor-gray-9 text-OpenColor-gray-7 dark:text-OpenColor-gray-1 antialiased`}>
				<Toaster position="top-center" reverseOrder={false} />
				<MainProvider>
					{/* <Navbar /> */}
					<main className="mt-8 px-16 m-auto pb-[50px]">{children}</main>
					{/* <Footer /> */}
				</MainProvider>
			</body>
		</html>
	);
}
