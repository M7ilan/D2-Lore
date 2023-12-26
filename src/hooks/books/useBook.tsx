import { getPresentationNodeDef } from "@d2api/manifest-web";

export default function useBook(book: number) {
	const bookContent = getPresentationNodeDef(book);

	return bookContent;
}
