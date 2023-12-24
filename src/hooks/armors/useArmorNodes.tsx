import { getPresentationNodeDef } from "@d2api/manifest-web";

export default function useArmorNodes() {
	const lore = getPresentationNodeDef(1605042242);
	const nodes = lore?.children.presentationNodes.map((node) => getPresentationNodeDef(node.presentationNodeHash));

	return nodes;
}
