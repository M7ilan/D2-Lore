"use client";

import useBook from "@/src/hooks/books/useBook";
import useImageLoad from "@/src/hooks/useImageLoad";
import clsx from "clsx";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { getLoreDef, getRecordDef } from "@d2api/manifest-web";
import { useLore } from "@/src/providers/LoreProvider";
import Bookmark from "@/src/icons/Bookmark";

export default function Book() {
	const { node, book, record, setRecord } = useLore();

	const bookContent = useBook(book);
	const bookmarks = useSelector((state: RootState) => state.bookmarks.bookmarks);
	const reads = useSelector((state: RootState) => state.reads.reads);
	const { isImageLoaded, handleImageLoad } = useImageLoad();
	const name = bookContent?.displayProperties.name;
	const image = bookContent?.displayProperties.iconSequences?.[1]?.frames[0];
	const imageSrc = image && `https://www.bungie.net${image}`;
	const records = bookContent?.children.records;
	const bookHash = bookContent?.hash || 0;

	function handleOnClick(recordHash: number) {
		setRecord(recordHash);
		window.history.pushState({}, "", `/books/${node}/${book}/${recordHash}`);
	}

	return (
		<div key={book} className="grid gap-8 content-start h-full">
			<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }} className="border-y-2 center subtitle py-5 text-center">
				{name}
			</motion.div>
			<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.3 }}>
				{imageSrc && <Image priority unoptimized quality={100} onLoad={() => handleImageLoad(bookHash)} className={clsx("max-lg:hidden animate w-full", { "opacity-100": isImageLoaded[bookHash], "opacity-0": !isImageLoaded[bookHash] })} src={imageSrc} width={359} height={460} alt={name || "book"} />}
			</motion.div>
			<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.3 }} className="grid grid-cols-[repeat(auto-fill,40px)] w-full justify-start gap-2">
				{records
					?.filter((recordId) => {
						const loreHash = getRecordDef(recordId.recordHash)?.loreHash;
						const loreTitle = loreHash && getLoreDef(loreHash)?.displayProperties.name;
						return loreTitle;
					})
					.map((recordDiff, index) => {
						const recordHash = recordDiff.recordHash;
						const bookmarked = bookmarks.find((bookmark) => bookmark.record == recordHash);
						const read = reads.find((read) => read.record == recordHash);

						return (
							<motion.div key={recordHash} onClick={() => handleOnClick(recordHash)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.3 }}>
								<div className={clsx("node w-[40px] h-[40px]", { active: record == recordHash, "read": read })}>
									{index + 1}
									<AnimatePresence>
										{bookmarked && (
											<motion.div style={{ overflow: "hidden" }} initial={{ height: 0 }} animate={{ height: 100 }} exit={{ height: 0 }} transition={{ duration: 0.5 }} className="absolute w-2 right-0 top-0">
												<Bookmark className="text-error" />
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							</motion.div>
						);
					})}
			</motion.div>
		</div>
	);
}
