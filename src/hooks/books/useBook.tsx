import { useLore } from "@/src/providers/LoreProvider";
import { useManifest } from "@/src/providers/ManifestProvider";

export default function useBook() {
	const { manifest } = useManifest();
	const { book } = useLore();
  const bookContent = manifest?.DestinyPresentationNodeDefinition[book];

	return bookContent
}
