"use client";

import LoreRecordContent from "@/src/components/Lore/LoreRecordContent";
import useIsSmallScreen from "@/src/hooks/useIsSmallScreen";
import { useLore } from "@/src/providers/LoreProvider";
import { useManifest } from "@/src/providers/ManifestProvider";
import { Bookmark } from "@/src/types/Bookmark";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineBookOpen } from "react-icons/hi";

export default function BookmarkPage() {
	const { manifest } = useManifest();
	const { setBook, record, setRecord } = useLore();
	const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
	const isSmallScreen = useIsSmallScreen();

	useEffect(() => {
		const savedBookmarks = localStorage.getItem("bookmarks");
		if (savedBookmarks) {
			const parsedBookmarks = JSON.parse(savedBookmarks);
			const bookmarkValues = Object.values(parsedBookmarks) as Bookmark[];
			setBookmarks(bookmarkValues);
			if (bookmarkValues.length > 0) {
				setBook(bookmarkValues[0].book);
				setRecord(bookmarkValues[0].record);
			}
		}
	}, []);

	const handleSmoothScroll = (recordHash: number) => {
		setRecord(recordHash);

		if (isSmallScreen) {
			setTimeout(() => {
				document.getElementById(`record-title-[${recordHash}]`)?.scrollIntoView({ behavior: "smooth" });
			});
		}
	};

	if (bookmarks.length === 0) return <div className="grid border-y h-full items-center border-default title center py-8">You don&apos;t have any bookmarks yet!</div>;

	return (
		<div className="grid grid-cols-[1fr] grid-rows-[min-content_1fr] md:grid-cols-[320px_2fr] md:grid-rows-[1fr] md:gap-x-8 gap-y-2 duration-0">
			<div className="flex md:col-span-2 justify-between items-center">
				<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 title duration-0">
					<div className="opacity-50 font-normal">Bookmark</div>
				</motion.div>
			</div>
			<div className="grid grid-cols-1 content-start max-md:mb-16 gap-8">
				<div className="grid text-center items-center gap-2">
					{bookmarks.map((bookmark, index) => (
						<div key={index} className="flex gap-2">
							<div className="btn-0 flex-1" onClick={() => handleSmoothScroll(bookmark.record)}>
								{manifest?.DestinyRecordDefinition[bookmark.record].displayProperties.name}
							</div>
							<Link href={`/books/${bookmark.node}/${bookmark.book}/${bookmark.record}`} className="btn-0 !p-2">
								<HiOutlineBookOpen className="w-6 h-6" />
							</Link>
						</div>
					))}
				</div>
			</div>
			<div className="grid lg:grid-cols-1 gap-8">
				<LoreRecordContent key={`recordcontent-${record}`} />
			</div>
		</div>
	);
}
