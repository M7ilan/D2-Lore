import { AllDestinyManifestComponents } from "bungie-api-ts/destiny2";

export function fetchFirstNode(manifest: AllDestinyManifestComponents | null) {
	const lore = manifest?.DestinyPresentationNodeDefinition[4077680549]; // Lore Definition
	return lore?.children.presentationNodes[0].presentationNodeHash ?? 0;
}

export function fetchFirstBookAndRecord(manifest: AllDestinyManifestComponents | null, node: number) {
	const newNode = manifest?.DestinyPresentationNodeDefinition[node];
	const firstBook = newNode?.children.presentationNodes[0].presentationNodeHash ?? 0;
	const firstRecord = (firstBook && manifest?.DestinyPresentationNodeDefinition[firstBook].children.records[0].recordHash) ?? 0;

	return { firstBook, firstRecord };
}
