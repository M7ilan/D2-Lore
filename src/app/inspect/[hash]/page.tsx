import FullItemIcon from "@/src/components/FullItemIcon";
import { DestinyClass } from "@/src/types/DestinyClass";
import fetchData from "@/src/utils/fetchData";
import { DestinyInventoryItemDefinition, DestinyLoreDefinition, DestinyManifest } from "bungie-api-ts/destiny2";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { hash: number } }): Promise<Metadata> {
	const hash = params.hash;

	const options = {
		headers: {
			"X-API-Key": process.env.NEXT_PUBLIC_API_KEY as string,
		},
	};

	const destinyManifest: DestinyManifest = (await fetchData("https://www.bungie.net/Platform/Destiny2/Manifest/", options)).Response;
	const components = destinyManifest.jsonWorldComponentContentPaths.en;
	const InventoryItemDefinition = await fetchData(`https://www.bungie.net${components["DestinyInventoryItemDefinition"]}`, options);

	const item: DestinyInventoryItemDefinition = InventoryItemDefinition[hash];
	if (!item) throw new Error("Item not found");

	const name = item.displayProperties.name;
	const flavorText = item.flavorText;

	return {
		title: name,
		description: flavorText,
	};
}

export default async function Inspect({ params }: { params: { hash: number } }) {
	const hash = params.hash;

	const options = {
		headers: {
			"X-API-Key": process.env.NEXT_PUBLIC_API_KEY as string,
		},
	};

	const destinyManifest: DestinyManifest = (await fetchData("https://www.bungie.net/Platform/Destiny2/Manifest/", options)).Response;
	const components = destinyManifest.jsonWorldComponentContentPaths.en;
	const InventoryItemDefinition = await fetchData(`https://www.bungie.net${components["DestinyInventoryItemDefinition"]}`, options);
	const LoreDefinition = await fetchData(`https://www.bungie.net${components["DestinyLoreDefinition"]}`, options);

	const item: DestinyInventoryItemDefinition = InventoryItemDefinition[hash];
	if (!item) throw new Error("Item not found");

	const bungieURL = "https://www.bungie.net";
	const name = item.displayProperties.name;
	const icon = bungieURL + item.displayProperties.icon;
	const watermark = bungieURL + item.iconWatermark;
	const itemType = item.itemTypeDisplayName;
	const classType = DestinyClass[item.classType];
	const flavorText = item.flavorText;

	const loreHash = item.loreHash || 0;
	const loreDiff: DestinyLoreDefinition = LoreDefinition[loreHash];
	const loreDescription = loreDiff?.displayProperties.description;

	return (
		<div className="my-8 mx-[2%] grid grid-rows-[min-content_1fr] gap-8">
			<div className="flex gap-4 items-center">
				<FullItemIcon id={loreHash} iconSrc={icon} watermarkSrc={watermark} className="border-2 border-default-50" />
				<div className="flex flex-col">
					<div className="header">{name}</div>
					<div className="text-default-50">
						{classType} {itemType}
					</div>
				</div>
			</div>
			<div className="grid grid-rows-[min-content_1fr] gap-8">
				<div className="title whitespace-pre-line">{flavorText}</div>
				<div className="text-default-60 whitespace-pre-line">{loreDescription}</div>
			</div>
		</div>
	);
}

// export async function generateStaticParams() {
// 	const options = {
// 		headers: {
// 			"X-API-Key": process.env.NEXT_PUBLIC_API_KEY as string,
// 		},
// 	};

// 	const destinyManifest: DestinyManifest = (await fetchData("https://www.bungie.net/Platform/Destiny2/Manifest/", options)).Response;
// 	const components = destinyManifest.jsonWorldComponentContentPaths.en;
// 	const InventoryItemDefinition = await fetchData(`https://www.bungie.net${components["DestinyInventoryItemDefinition"]}`, options);

// 	const hashes = Object.keys(InventoryItemDefinition);
// 	return hashes.map((hash) => ({ hash }));
// }
