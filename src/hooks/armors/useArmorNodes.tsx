import { useManifest } from "@/src/providers/ManifestProvider";

export default function useArmorNodes() {
	const { manifest } = useManifest();
	const lore = manifest?.DestinyPresentationNodeDefinition[1605042242];
	const nodes = lore?.children.presentationNodes.map((node) => manifest?.DestinyPresentationNodeDefinition[node.presentationNodeHash]);

	return nodes;
}
