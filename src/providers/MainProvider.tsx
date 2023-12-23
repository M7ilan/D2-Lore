import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import LoadingProvider from "./LoadingProvider";
import LoreProvider from "./LoreProvider";
import ManifestProvider from "./ManifestProvider";
import ThemeProvider from "./ThemeProvider";
import { Toaster } from "react-hot-toast";
import BookmarksProvider from "./BookmarksProvider";
import ReadsProvider from "./ReadsProvider";
import ArmorProvider from "./ArmorProvider";

export default function MainProvider({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider>
			<ManifestProvider>
				<LoreProvider>
					<ArmorProvider>
						<BookmarksProvider>
							<ReadsProvider>
								<LoadingProvider />
								{children}
							</ReadsProvider>
						</BookmarksProvider>
					</ArmorProvider>
				</LoreProvider>
			</ManifestProvider>
			<Analytics />
			<SpeedInsights />
			<Toaster position="top-center" reverseOrder={false} />
		</ThemeProvider>
	);
}
