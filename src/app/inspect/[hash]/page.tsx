import { Metadata } from "next";
import Component from "./component";
import { DestinyInventoryItemDefinition, DestinyManifest } from "bungie-api-ts/destiny2";
import fetchData from "@/src/utils/fetchData";

const options = {
	headers: {
		"X-API-Key": process.env.NEXT_PUBLIC_API_KEY as string,
	},
};

async function fetchItemData(hash: number): Promise<DestinyInventoryItemDefinition> {
	const destinyManifest: DestinyManifest = (await fetchData("https://www.bungie.net/Platform/Destiny2/Manifest/", options)).Response;
	const definition = destinyManifest.jsonWorldComponentContentPaths.en["DestinyInventoryItemDefinition"];
	const InventoryItemDefinition = await fetchData(`https://www.bungie.net${definition}`, options);

	return InventoryItemDefinition[hash];
}

export default function InspectPage({ params }: { params: { hash: number } }) {
	const hash = params.hash;

	return <Component params={{ hash }} />;
}

export async function generateMetadata({ params }: { params: { hash: number } }): Promise<Metadata> {
	const hash = params.hash;
	const item = await fetchItemData(hash);

	if (!item) throw new Error("Item not found");

	const name = item.displayProperties.name;
	const flavorText = item.flavorText;

	return {
		title: name,
		description: flavorText,
	};
}

// Generate static pages for each item for quick access 
export async function generateStaticParams() {
	const options = {
		headers: {
			"X-API-Key": process.env.NEXT_PUBLIC_API_KEY as string,
		},
	};

	const destinyManifest: DestinyManifest = (await fetchData("https://www.bungie.net/Platform/Destiny2/Manifest/", options)).Response;
	const components = destinyManifest.jsonWorldComponentContentPaths.en;
	const InventoryItemDefinition = await fetchData(`https://www.bungie.net${components["DestinyInventoryItemDefinition"]}`, options);

	const hashes = Object.keys(InventoryItemDefinition);
	return hashes.map((hash) => ({ hash }));
}