import { AllDestinyManifestComponents } from "bungie-api-ts/destiny2";
import { get, set } from "idb-keyval";
import fetchData from "./fetchData";
import ToastError from "@/src/components/ToastError";
import neededComponents from "./neededComponents";

type ManifestType = AllDestinyManifestComponents & { version: string };
const MANIFEST_KEY = "Manifest";

async function fetchManifestStatus(): Promise<{ version: string; isApiDown: boolean }> {
	console.log("🔃 Fetching manifest status...");
	const response = await fetchData("/api/get-manifest-status");

	const isApiDown = response.ErrorStatus === "SystemDisabled";
	if (isApiDown) {
		console.error("❌ Bungie API is down");
	} else {
		console.log("✅ Manifest status fetched successfully");
	}

	return { version: response.version, isApiDown };
}

async function fetchAndStoreManifest(): Promise<AllDestinyManifestComponents> {
	console.log("🔃 Fetching manifest...");
	const response = await fetchData("/api/get-manifest");
	await set(MANIFEST_KEY, response);
	console.log("✅ Manifest fetched and stored successfully");
	return response;
}

export default async function setUpManifest(): Promise<AllDestinyManifestComponents | null> {
	console.log("🔃 Setting up manifest...");
	const startTime = Date.now();

	try {
		const { version, isApiDown } = await fetchManifestStatus();

		// Check if Bungie API is down.
		if (isApiDown) {
			ToastError("Bungie API is down");
			return null;
		}

		const storedManifest = await get<ManifestType>(MANIFEST_KEY);

		// Check if manifest is stored.
		if (storedManifest) {
			// Check if stored manifest is up to date.
			if (version === storedManifest.version) {
				console.log("✅ Manifest is up to date");

				// Make sure needed components match stored manifest.
				const storedManifestKeys = Object.keys(storedManifest).filter((key) => key !== "version") as (keyof AllDestinyManifestComponents)[];
				const neededComponentsKeys = neededComponents;
				const isManifestComplete = neededComponentsKeys.every((key) => storedManifestKeys.includes(key));
				const isManifestNotExcessive = storedManifestKeys.every((key) => neededComponentsKeys.includes(key));

				if (!isManifestComplete || !isManifestNotExcessive) {
					console.log("❌ Manifest components mismatch");
					const manifestData = await fetchAndStoreManifest();
					console.log("✅ Manifest components updated successfully");
					return manifestData;
				}

				return storedManifest;
			} else {
				// Manifest is outdated, fetch and store new manifest.
				console.log("❌ Manifest is outdated");
				const manifestData = await fetchAndStoreManifest();
				console.log("✅ Manifest set up successfully");
				return manifestData;
			}
		} else {
			// Manifest is not stored, fetch and store new manifest.
			console.log("❌ No manifest stored");
			const manifestData = await fetchAndStoreManifest();
			console.log("✅ Manifest set up successfully");
			return manifestData;
		}
	} catch (error: any) {
		console.error("❌ Error in manifest setup:", error);
		throw error;
	} finally {
		const endTime = Date.now();
		console.log(`⏱️ Setup time: ${endTime - startTime}ms`);
	}
}
