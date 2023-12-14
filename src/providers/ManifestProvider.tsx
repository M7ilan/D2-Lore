"use client";

import { createContext, useContext, useEffect, useState } from "react";
import setUpManifest from "@/src/utils/setUpManifest";
import { AllDestinyManifestComponents } from "bungie-api-ts/destiny2";

type ManifestContextType = {
	manifest: AllDestinyManifestComponents | null;
	isLoading: boolean;
};

const ManifestContext = createContext<ManifestContextType>({ manifest: null, isLoading: true });

export default function ManifestProvider({ children }: { children: React.ReactNode }) {
	const [manifest, setManifest] = useState<AllDestinyManifestComponents | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchManifest() {
			const manifestData = await setUpManifest();
			setManifest(manifestData);
			setIsLoading(false);
		}

		fetchManifest();
	}, []);

	return <ManifestContext.Provider value={{ manifest, isLoading }}>{children}</ManifestContext.Provider>;
}

export const useManifest = () => useContext(ManifestContext);
