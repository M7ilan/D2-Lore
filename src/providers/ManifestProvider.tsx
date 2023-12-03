"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AllDestinyManifestComponents } from "bungie-api-ts/destiny2";
import { get } from "idb-keyval";
import clearManifest, { initializeManifest, isValidManifest } from "@/src/utils/Manifest";

interface ManifestContextType {
	manifest: AllDestinyManifestComponents | null;
	isLoading: boolean;
	loadingStatus: string;
}

const ManifestContext = createContext<ManifestContextType>({ manifest: null, isLoading: true, loadingStatus: "Loading..." });

export default function ManifestProvider({ children }: { children: ReactNode }) {
	const [manifest, setManifest] = useState<AllDestinyManifestComponents | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [loadingStatus, setLoadingStatus] = useState("Loading...");

	useEffect(() => {
		const fetchManifest = async () => {
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
		};

		fetchManifest();
	}, []);

	return <ManifestContext.Provider value={{ manifest, isLoading, loadingStatus }}>{children}</ManifestContext.Provider>;
}

export const useManifest = (): ManifestContextType => useContext(ManifestContext);
