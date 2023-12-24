import { useLore } from "@/src/providers/LoreProvider";
import { getPresentationNodeDef } from "@d2api/manifest-web";

export default function useBooks() {
	const { node } = useLore();
	const books = getPresentationNodeDef(node)?.children.presentationNodes.map((book) => getPresentationNodeDef(book.presentationNodeHash));

	return books;
}
