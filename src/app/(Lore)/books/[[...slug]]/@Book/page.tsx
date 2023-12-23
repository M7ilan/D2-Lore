"use client";

import useBook from "@/src/hooks/books/useBook";
import useImageLoad from "@/src/hooks/useImageLoad";
import { useLore } from "@/src/providers/LoreProvider";
import { useManifest } from "@/src/providers/ManifestProvider";
import clsx from "clsx";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { bookmarkSVG } from "@/src/icons";
import { useBookmarks } from "@/src/providers/BookmarksProvider";
import { useReads } from "@/src/providers/ReadsProvider";

export default function BookPage() {
	const { manifest } = useManifest();
	const bookContent = useBook();
	const { node, book, record, setRecord } = useLore();
	const { isImageLoaded, handleImageLoad } = useImageLoad();
	const name = bookContent?.displayProperties.name;
	const image = bookContent?.displayProperties.iconSequences?.[1]?.frames[0];
	const imageSrc = (image && `https://www.bungie.net${image}`) || "/Black.png";
	const records = bookContent?.children.records;
	const bookHash = bookContent?.hash || 0;
	const { bookmarks } = useBookmarks();
	const { reads } = useReads();

	function handleOnClick(hash: number) {
		setRecord(hash);
		window.history.pushState({}, "", `/books/${node}/${book}/${hash}`);
	}

	return (
		<div key={book} className="grid gap-8 content-start h-full">
			<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }} className="border-y-2 center title py-5">
				{name}
			</motion.div>
			<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.3 }}>
				<Image priority unoptimized quality={100} onLoad={() => handleImageLoad(bookHash)} className={clsx("max-lg:hidden animate", { "opacity-100": isImageLoaded[bookHash], "opacity-0": !isImageLoaded[bookHash] })} src={imageSrc} width={359} height={460} alt={name || "book"} />
			</motion.div>
			<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.3 }} className="grid grid-cols-[repeat(auto-fill,40px)] w-full justify-start gap-2">
				{records
					?.filter((recordId) => {
						const loreHash = manifest?.DestinyRecordDefinition[recordId.recordHash]?.loreHash;
						const loreTitle = loreHash && manifest?.DestinyLoreDefinition[loreHash]?.displayProperties.name;
						return loreTitle;
					})
					.map((recordDiff, index) => {
						const recordHash = recordDiff.recordHash;
						// check if bookmarked by checking if recordHash is in bookmarks
						const bookmarked = bookmarks.find((bookmark) => bookmark.record == recordHash);
						const read = reads.find((read) => read.record == recordHash);

						return (
							<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.3 }} key={recordHash} onClick={() => handleOnClick(recordHash)} className={clsx("node w-[40px] h-[40px]", { active: record == recordHash, "!bg-default-0": read })}>
								{index + 1}
								<AnimatePresence>
									{bookmarked && (
										<motion.div style={{ overflow: "hidden" }} initial={{ height: 0 }} animate={{ height: 100 }} exit={{ height: 0 }} transition={{ duration: 0.5 }} className="absolute w-2 right-0 top-0 opacity-90">
											<Image src={bookmarkSVG} width={1080} height={1080} alt="bookmark" />
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>
						);
					})}
			</motion.div>
		</div>
	);
}
