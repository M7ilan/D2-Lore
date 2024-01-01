type BooksLayoutsProps = {
	Title: React.ReactNode;
	Nodes: React.ReactNode;
	Books: React.ReactNode;
	Book: React.ReactNode;
	Record: React.ReactNode;
};

export default function BooksLayout({ Title, Nodes, Books, Book, Record }: BooksLayoutsProps) {
	return (
		<div className="grid grid-rows-[min-content_1fr] gap-4">
			<div>{Title}</div>
			<div className="grid max-lg:grid-rows-[min-content_1fr] lg:grid-cols-[320px_1fr] gap-8">
				<div className="grid grid-rows-[min-content_1fr] gap-4">
					<div>{Nodes}</div>
					<div className="border-t-2 pt-4">{Books}</div>
				</div>
				<div className="grid lg:grid-cols-[minmax(120px,376px)_minmax(330px,auto)] gap-8 lg:border-l-2 lg:pl-8">
					<div>{Book}</div>
					<div>{Record}</div>
				</div>
			</div>
		</div>
	);
}
