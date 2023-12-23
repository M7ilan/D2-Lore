import { useManifest } from "@/src/providers/ManifestProvider";
import { useLore } from "@/src/providers/LoreProvider";

export default function useBooks() {
	const { manifest } = useManifest();
	const { node } = useLore();
	const books = manifest?.DestinyPresentationNodeDefinition[node]?.children.presentationNodes.map((book) => manifest?.DestinyPresentationNodeDefinition[book.presentationNodeHash]);

	return books;
}
