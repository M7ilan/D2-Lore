"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AllDestinyManifestComponents } from "bungie-api-ts/destiny2";
import { get } from "idb-keyval";
import clearManifest, { initializeManifest, isValidManifest, checkAPIStatus } from "@/src/utils/Manifest"; // Import checkAPIStatus

type ManifestContextType = {
	manifest: AllDestinyManifestComponents | null;
	isLoading: boolean;
	loadingStatus: string;
	down: boolean;
};

const ManifestContext = createContext<ManifestContextType>({ manifest: null, isLoading: true, down: false, loadingStatus: "Loading..." });

export default function ManifestProvider({ children }: { children: ReactNode }) {
	const [manifest, setManifest] = useState<AllDestinyManifestComponents | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [loadingStatus, setLoadingStatus] = useState("Loading...");
	const [down, setDown] = useState(false);

	useEffect(() => {
		const fetchManifest = async () => {
			const apiStatus = await checkAPIStatus();
			if (apiStatus.down) {
				setLoadingStatus(apiStatus.message);
				setIsLoading(true);
				setDown(true);
				return;
			}

			try {
				setLoadingStatus("Checking Manifest...");
				let currentManifest = await get<AllDestinyManifestComponents>("Manifest");

				if (!currentManifest || !(await isValidManifest())) {
					setLoadingStatus("Initializing Manifest...");
					await clearManifest();
					await initializeManifest();
					currentManifest = await get<AllDestinyManifestComponents>("Manifest");
				}

				setManifest(currentManifest !== undefined ? currentManifest : null);
				setLoadingStatus("Loaded");
				setIsLoading(false);
			} catch (error: any) {
				console.error("Error fetching manifest:", error);
				setLoadingStatus(`Error: ${error.message}`);
				setIsLoading(false);
			}
		};

		fetchManifest();
	}, []);

	return <ManifestContext.Provider value={{ manifest, isLoading, down, loadingStatus }}>{children}</ManifestContext.Provider>;
}

export const useManifest = (): ManifestContextType => useContext(ManifestContext);
