import { useLore } from "@/src/providers/LoreProvider";
import { useManifest } from "@/src/providers/ManifestProvider";
import { NBR } from "@/src/types/NBR";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function LoreBooksCounter() {
	const { manifest } = useManifest();
	const { node } = useLore();
	const books = manifest?.DestinyPresentationNodeDefinition[node]?.children.presentationNodes;
	const CurrentNodeBooks = books?.length;
	const [CompletedBooks, setCompletedBooks] = useState(0);

	const updateCompletedBooks = (reads: NBR[]) => {
		let completed = 0;
		books?.forEach((book) => {
			const bookDefinition = manifest?.DestinyPresentationNodeDefinition[book.presentationNodeHash];
			const currentBookRecords = bookDefinition?.children.records.length || 0;
			const currentBookReads = reads.filter((read) => read.book == book.presentationNodeHash).length;
			if (currentBookReads === currentBookRecords) {
				completed++;
			}
		});
		setCompletedBooks(completed);
	};

	useEffect(() => {
		const savedRead = JSON.parse(localStorage.getItem("read") || "{}");
		const readValues: NBR[] = Object.values(savedRead);
		updateCompletedBooks(readValues);

		const handleLocalStorageChangeRead = (event: any) => {
			if (event.detail && event.detail.read) {
				const values: NBR[] = Object.values(event.detail.read);
				updateCompletedBooks(values);
			}
		};

		window.addEventListener("localStorageChange", handleLocalStorageChangeRead);

		return () => {
			window.removeEventListener("localStorageChange", handleLocalStorageChangeRead);
		};
	}, [books, manifest]);

	return (
		<div
			className={clsx("opacity-50 font-normal", {
				"text-OpenColor-yellow-5 !opacity-100": CompletedBooks === CurrentNodeBooks,
			})}
		>
			{CompletedBooks} / {CurrentNodeBooks}
		</div>
	);
}
