"use client";

import FullItemIcon from "@/src/components/FullItemIcon";
import { DestinyClass } from "@/src/types/DestinyClass";
import { getInventoryItemDef, getLoreDef } from "@d2api/manifest";

export default function InspectPage({ params }: { params: { hash: number } }) {
	const hash = params.hash;
	const item = getInventoryItemDef(hash);
	const lore = getLoreDef(hash);
	if (!item) throw new Error("Item not found");

	const bungieURL = "https://www.bungie.net";
	const name = item.displayProperties.name;
	const icon = bungieURL + item.displayProperties.icon;
	const watermark = bungieURL + item.iconWatermark;
	const itemType = item.itemTypeDisplayName;
	const classType = DestinyClass[item.classType];
	const flavorText = item.flavorText;

	const loreHash = item.loreHash || 0;
	const loreDescription = lore?.displayProperties.description;

	return (
		<div className="my-8 mx-[2%] grid grid-rows-[min-content_1fr] gap-8">
			<div className="flex gap-4 items-center">
				<FullItemIcon id={loreHash} iconSrc={icon} watermarkSrc={watermark} className="border-2 border-opacity-50" />
				<div className="flex flex-col">
					<div className="title">{name}</div>
					<div className="text-opacity-50">
						{classType} {itemType}
					</div>
				</div>
			</div>
			<div className="grid grid-rows-[min-content_1fr] gap-8">
				<div className="subtitle whitespace-pre-line">{flavorText}</div>
				<div className="text-opacity-60 whitespace-pre-line">{loreDescription}</div>
			</div>
		</div>
	);
}
