import { useArmor } from "@/src/providers/ArmorProvider";
import { getPresentationNodeDef } from "@d2api/manifest-web";

export default function useCategory() {
	const { category } = useArmor();
	const categoryContent = getPresentationNodeDef(category);

	return categoryContent;
}
