import { useArmor } from "@/src/providers/ArmorProvider";
import { getPresentationNodeDef } from "@d2api/manifest-web";

export default function useCatagories() {
	const { node } = useArmor();
	const categories = getPresentationNodeDef(node)?.children.presentationNodes.map((category) => getPresentationNodeDef(category.presentationNodeHash));

	return categories;
}
