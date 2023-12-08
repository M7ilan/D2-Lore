import { DestinyManifest, DestinyPresentationNodeDefinition, DestinyRecordDefinition, DestinyLoreDefinition } from "bungie-api-ts/destiny2";
import { DestinyManifestResponse } from "@/src/types/DestinyManifestResponse";
import { del, get, set } from "idb-keyval";
import { NeededManifestComponents } from "../types/NeededManifestComponents";

async function fetchJSON<T>(url: string): Promise<T> {
	const response = await fetch(url);
	const json = await response.json();
	return json;
}

export async function getDestinyManifest(): Promise<DestinyManifest> {
	console.log("Getting Destiny Manifest...");
	const json: DestinyManifestResponse = await fetchJSON("/api/get-manifest");
	console.log("Got Destiny Manifest");
	console.log(json);

	return json.Response;
}

async function fetchManifestComponent<T>(componentPath: string): Promise<T> {
	const url = `https://www.bungie.net${componentPath}`;
	return fetchJSON<T>(url);
}

async function storeManifestData(manifestComponents: NeededManifestComponents): Promise<void> {
	await set("Manifest", manifestComponents);
}

export async function getManifestVersion(): Promise<string> {
	console.log("Getting Manifest Version...");
	const manifest = await getDestinyManifest();
	localStorage.setItem("manifestVersion", manifest?.version);
	console.log("Got Manifest Version:", manifest?.version);
	return manifest?.version;
}

export async function isManifestUpToDate(): Promise<boolean> {
	console.log("Checking if Manifest is up to date...");
	const storedVersion = localStorage.getItem("manifestVersion");
	const currentVersion = await getManifestVersion();
	console.log("isManifestUpToDate: ", storedVersion === currentVersion);
	return storedVersion === currentVersion;
}

export async function storeManifest(): Promise<boolean> {
	console.log("Storing Manifest...");
	try {
		const currentManifest = await get<NeededManifestComponents>("Manifest");
		if (!currentManifest || !(await isManifestUpToDate())) {
			console.log("Updating Manifest...");
			const manifest = await getDestinyManifest();
			const components = manifest.jsonWorldComponentContentPaths.en;

			const presentationNode = await fetchManifestComponent<DestinyPresentationNodeDefinition>(components["DestinyPresentationNodeDefinition"]);
			const record = await fetchManifestComponent<DestinyRecordDefinition>(components["DestinyRecordDefinition"]);
			const lore = await fetchManifestComponent<DestinyLoreDefinition>(components["DestinyLoreDefinition"]);

			await storeManifestData({
				DestinyPresentationNodeDefinition: presentationNode,
				DestinyRecordDefinition: record,
				DestinyLoreDefinition: lore,
			});
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

export default async function clearManifest() {
	await del("Manifest");
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

export async function checkAPIStatus() {
	console.log("Checking API Status...");
	const json: DestinyManifestResponse = await fetchJSON("/api/get-manifest");
	if (json.ErrorStatus === "SystemDisabled") {
		return { down: true, message: "Bungie API is down" };
	}
	console.log("API Status Checked");

	return { down: false, message: "Bungie API is up" };
}
