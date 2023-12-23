import { useManifest } from "@/src/providers/ManifestProvider";
import { useArmor } from "@/src/providers/ArmorProvider";

export default function useCatagories() {
	const { manifest } = useManifest();
	const { node } = useArmor();
	const categories = manifest?.DestinyPresentationNodeDefinition[node]?.children.presentationNodes.map((category) => manifest?.DestinyPresentationNodeDefinition[category.presentationNodeHash]);

	return categories;
}
