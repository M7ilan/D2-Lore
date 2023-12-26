import { getPresentationNodeDef } from "@d2api/manifest-web";

export default function useBooks(node: number) {
	const books = getPresentationNodeDef(node)?.children.presentationNodes.map((book) => getPresentationNodeDef(book.presentationNodeHash));

	return books;
}
