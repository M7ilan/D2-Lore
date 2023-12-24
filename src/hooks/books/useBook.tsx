import { useLore } from "@/src/providers/LoreProvider";
import { getPresentationNodeDef } from "@d2api/manifest-web";

export default function useBook() {
	const { book } = useLore();
	const bookContent = getPresentationNodeDef(book);

	return bookContent;
}
