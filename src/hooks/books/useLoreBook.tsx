import { useLore } from "@/src/providers/LoreProvider";
import { useManifest } from "@/src/providers/ManifestProvider";

export default function useLoreBook() {
	const { manifest } = useManifest();
	const { record } = useLore();
	const loreHash = manifest?.DestinyRecordDefinition[record]?.loreHash;
	const loreContent = manifest?.DestinyLoreDefinition[loreHash || 0];

	return loreContent;
}
