import { DestinyManifest, AllDestinyManifestComponents } from "bungie-api-ts/destiny2";
import { DestinyManifestResponse } from "@/src/types/DestinyManifestResponse";
import { get, set } from "idb-keyval";

const BUNGIE_API_URL = "https://www.bungie.net/Platform/Destiny2";

async function fetchJSON<T>(url: string): Promise<T> {
	const response = await fetch(url);
	const json = await response.json();
	return json;
}

export async function getDestinyManifest(): Promise<DestinyManifest> {
	console.log("Getting Destiny Manifest...");
	const url = `${BUNGIE_API_URL}/Manifest/`;
	const json: DestinyManifestResponse = await fetchJSON(url);
	console.log("Got Destiny Manifest");
	return json.Response;
}

export async function getManifest(): Promise<AllDestinyManifestComponents> {
	console.log("Getting Manifest...");
	const manifest = await getDestinyManifest();
	const url = `https://www.bungie.net${manifest.jsonWorldContentPaths.en}`;
	const json = await fetchJSON<AllDestinyManifestComponents>(url);
	console.log("Got Manifest");
	return json;
}

export async function getManifestVersion(): Promise<string> {
	console.log("Getting Manifest Version...");
	const manifest = await getDestinyManifest();
	localStorage.setItem("manifestVersion", manifest.version);
	console.log("Got Manifest Version:", manifest.version);
	return manifest.version;
}

export async function isManifestUpToDate(): Promise<boolean> {
	console.log("Checking if Manifest is up to date...");
	const storedVersion = localStorage.getItem("manifestVersion");
	const currentVersion = await getManifestVersion();
	return storedVersion === currentVersion;
}

async function storeManifestData(manifest: AllDestinyManifestComponents): Promise<void> {
	await set("Manifest", {
		DestinyPresentationNodeDefinition: manifest.DestinyPresentationNodeDefinition,
		DestinyRecordDefinition: manifest.DestinyRecordDefinition,
		DestinyLoreDefinition: manifest.DestinyLoreDefinition,
	});
}

export async function storeManifest(): Promise<boolean> {
	console.log("Storing Manifest...");
	try {
		const currentManifest = await get("Manifest");
		if (!currentManifest || !(await isManifestUpToDate())) {
			console.log("Updating Manifest...");
			const manifest = await getManifest();
			await storeManifestData(manifest);
		}
		console.log("Manifest Stored");
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}

export async function initializeManifest() {
	console.log("Initializing Manifest...");
	await storeManifest();
	console.log("Manifest Initialized");
}

export async function isValidManifest(): Promise<boolean> {
	console.log("Checking Manifest...");
	try {
		const currentManifest = await get("Manifest");
		if (!currentManifest || !(await isManifestUpToDate())) {
			console.log("Manifest not valid");
			return false;
		}
		console.log("Manifest Checked");
		return true;
	} catch (error) {
		console.error("Error checking manifest:", error);
		return false;
	}
}
