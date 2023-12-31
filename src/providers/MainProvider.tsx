import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import LoadingProvider from "./LoadingProvider";
import LoreProvider from "./LoreProvider";
import ManifestProvider from "./ManifestProvider";
import ThemeProvider from "./ThemeProvider";

export default function MainProvider({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider>
			<ManifestProvider>
				<LoadingProvider />
				<LoreProvider>{children}</LoreProvider>
			</ManifestProvider>
			<Analytics />
			<SpeedInsights />
		</ThemeProvider>
	);
}
