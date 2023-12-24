"use client";

import { includeTables, loadDefs, setApiKey } from "@d2api/manifest-web";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Loading from "@/src/components/Loading";

export default function ManifestProvider({ children }: { children: React.ReactNode }) {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		(async () => {
			console.log("🔃 Loading Manifest...");
			setApiKey(process.env.NEXT_PUBLIC_API_KEY);
			includeTables(["Collectible", "InventoryItem", "Lore", "PresentationNode", "Record"]);
			const definitions = await loadDefs();

			if (!definitions) throw new Error("definitions failed to load.");

			console.log("✅ Manifest Loaded!");
			setIsLoading(true);
		})();
	}, []);

	return <AnimatePresence>{isLoading ? children : <Loading key={"Loading"} />}</AnimatePresence>;
}
