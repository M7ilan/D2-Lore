import { useManifest } from "@/src/providers/ManifestProvider";

export default function useLoreNodes() {
	const { manifest } = useManifest();
	const lore = manifest?.DestinyPresentationNodeDefinition[4077680549];
	const nodes = lore?.children.presentationNodes.map((node) => manifest?.DestinyPresentationNodeDefinition[node.presentationNodeHash]);

	return nodes;
}
