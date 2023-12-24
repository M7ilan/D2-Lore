import { getPresentationNodeDef } from "@d2api/manifest-web";

export default function useLoreNodes() {
	const lore = getPresentationNodeDef(4077680549);
	const nodes = lore?.children.presentationNodes.map((node) => getPresentationNodeDef(node.presentationNodeHash));

	return nodes;
}
