import { Metadata } from "next";

type BooksLayoutsProps = {
	Title: React.ReactNode;
	Nodes: React.ReactNode;
	Books: React.ReactNode;
	Book: React.ReactNode;
	Record: React.ReactNode;
};

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
	const nodeSlug = params?.slug?.[0];
	const bookSlug = params?.slug?.[1];
	const recordSlug = params?.slug?.[2];

	if (!nodeSlug) return { title: "Books" };
	if (!bookSlug) return { title: `node: ${nodeSlug}` };
	if (!recordSlug) return { title: `book: ${bookSlug}` };

	return {
		title: `record: ${recordSlug}`,
	};
}

export default function BooksLayout({ Title, Nodes, Books, Book, Record }: BooksLayoutsProps) {
	return (
		<div className="grid grid-rows-[min-content_1fr] gap-4">
			<div>{Title}</div>
			<div className="grid max-lg:grid-rows-[min-content_1fr] lg:grid-cols-[320px_1fr] gap-8">
				<div className="grid grid-rows-[min-content_1fr] gap-4">
					<div>{Nodes}</div>
					<div className="border-t-2 pt-4">{Books}</div>
				</div>
				<div className="grid lg:grid-cols-[minmax(120px,376px)_minmax(376px,auto)] gap-8 lg:border-l-2 lg:pl-8">
					<div>{Book}</div>
					<div>{Record}</div>
				</div>
			</div>
		</div>
	);
}
