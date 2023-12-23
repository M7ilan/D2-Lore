import { AllDestinyManifestComponents } from "bungie-api-ts/destiny2";

export function getFirstNode(manifest: AllDestinyManifestComponents | null, node: number) {
	const lore = manifest?.DestinyPresentationNodeDefinition[node]; // Lore Definition
	return lore?.children.presentationNodes[0].presentationNodeHash ?? 0;
}

export function getFirstChildOfNode(manifest: AllDestinyManifestComponents | null, node: number) {
	const newNode = manifest?.DestinyPresentationNodeDefinition[node];
	return newNode?.children.presentationNodes[0].presentationNodeHash ?? 0;
}

export function getFirstRecord(manifest: AllDestinyManifestComponents | null, book: number) {
	const records = manifest?.DestinyPresentationNodeDefinition[book]?.children.records;

	const firstNonEmptyLoreRecord = records?.find((record) => {
		const loreHash = manifest?.DestinyRecordDefinition[record.recordHash]?.loreHash;
		const loreTitle = loreHash && manifest?.DestinyLoreDefinition[loreHash]?.displayProperties.name;
		return loreTitle;
	});

	return firstNonEmptyLoreRecord?.recordHash ?? 0;
}
