import { useArmor } from "@/src/providers/ArmorProvider";
import { useManifest } from "@/src/providers/ManifestProvider";

export default function useCategory() {
	const { manifest } = useManifest();
	const { category } = useArmor();
  const categoryContent = manifest?.DestinyPresentationNodeDefinition[category];

	return categoryContent
}
