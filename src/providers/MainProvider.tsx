"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import LoadingProvider from "./LoadingProvider";
import LoreProvider from "./LoreProvider";
import ManifestProvider from "./ManifestProvider";
import ThemeProvider from "./ThemeProvider";
import { Toaster } from "react-hot-toast";
import ArmorProvider from "./ArmorProvider";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function MainProvider({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<ThemeProvider>
				<ManifestProvider>
					<LoreProvider>
						<ArmorProvider>
							<LoadingProvider />
							{children}
						</ArmorProvider>
					</LoreProvider>
				</ManifestProvider>
				<Analytics />
				<SpeedInsights />
				<Toaster position="top-center" reverseOrder={false} />
			</ThemeProvider>
		</Provider>
	);
}
