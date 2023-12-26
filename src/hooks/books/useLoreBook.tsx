import { getLoreDef, getRecordDef } from "@d2api/manifest-web";

export default function useLoreBook(record: number) {
	const loreHash = getRecordDef(record)?.loreHash;
	const loreContent = getLoreDef(loreHash);

	return loreContent;
}
