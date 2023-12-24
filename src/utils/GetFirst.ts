import { getLoreDef, getPresentationNodeDef, getRecordDef } from "@d2api/manifest-web";

export function getFirstNode(node: number) {
	const newNode = getPresentationNodeDef(node);
	return newNode?.children.presentationNodes[0].presentationNodeHash ?? 0;
}

export function getFirstChildOfNode(node: number) {
	const newNode = getPresentationNodeDef(node);
	return newNode?.children.presentationNodes[0].presentationNodeHash ?? 0;
}

export function getFirstRecord(book: number) {
	const records = getPresentationNodeDef(book)?.children.records;

	const firstNonEmptyLoreRecord = records?.find((record) => {
		const loreHash = getRecordDef(record.recordHash)?.loreHash;
		const loreTitle = getLoreDef(loreHash)?.displayProperties.name;
		return loreTitle;
	});

	return firstNonEmptyLoreRecord?.recordHash ?? 0;
}
