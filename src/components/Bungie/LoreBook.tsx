// src\components\Bungie\LoreBook.tsx

import Image from "next/image";
import clsx from "clsx";
import { useManifest } from "@/src/providers/ManifestProvider";
import { motion } from "framer-motion";
import { useLore } from "@/src/providers/LoreProvider";

export default function LoreBook() {
	const { manifest } = useManifest();
	const { node, book, setBook } = useLore();
	const books = manifest?.DestinyPresentationNodeDefinition[node]?.children.presentationNodes;

	return (
		<>
			{books?.map((bookId, index) => {
				const isActive = bookId.presentationNodeHash === book;
				const bookDefinition = manifest?.DestinyPresentationNodeDefinition[bookId.presentationNodeHash];
				return (
					<motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.3 }} className="duration-0">
						<div className={clsx("book", { "active-book": isActive })} onClick={() => setBook(bookId.presentationNodeHash)}>
							<Image priority src={`https://www.bungie.net${bookDefinition?.displayProperties.iconSequences[1].frames[0]}`} width={1436} height={1840} alt="Book" />
						</div>
					</motion.div>
				);
			})}
		</>
	);
}
