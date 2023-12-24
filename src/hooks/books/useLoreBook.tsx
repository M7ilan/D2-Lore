import { useLore } from "@/src/providers/LoreProvider";
import { getLoreDef, getRecordDef } from "@d2api/manifest-web";

export default function useLoreBook() {
	const { record } = useLore();
	const loreHash = getRecordDef(record)?.loreHash;
	const loreContent = getLoreDef(loreHash);

	return loreContent;
}
