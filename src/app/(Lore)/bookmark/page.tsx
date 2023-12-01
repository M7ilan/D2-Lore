"use client";

import LoreRecordContent from "@/src/components/Lore/LoreRecordContent";
import useIsSmallScreen from "@/src/hooks/useIsSmallScreen";
import { useLore } from "@/src/providers/LoreProvider";
import { useManifest } from "@/src/providers/ManifestProvider";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BookmarkPage() {
	const { manifest } = useManifest();
	const { setBook, record, setRecord } = useLore();
	const [bookmarks, setBookmarks] = useState<number[]>([]);
	const isSmallScreen = useIsSmallScreen();

	useEffect(() => {
		const savedBookmarks = localStorage.getItem("bookmarks");
		if (savedBookmarks) {
			const parsedBookmarks = JSON.parse(savedBookmarks);
			const trueBookmarks = Object.keys(parsedBookmarks)
				.filter((key: string) => parsedBookmarks[key] === true)
				.map((key: string) => parseInt(key));
			setBookmarks(trueBookmarks);
			if (trueBookmarks.length > 0) {
				setBook(trueBookmarks[0]);
				setRecord(trueBookmarks[0]);
			} else {
				setBook(0);
				setRecord(0);
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

	return (
		<div className="grid grid-cols-[1fr] grid-rows-[min-content_1fr] md:grid-cols-[320px_2fr] md:grid-rows-[1fr] md:gap-x-8 gap-y-2">
			<div className="flex md:col-span-2 justify-between items-center">
				<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 title duration-0">
					<div className="opacity-50 font-normal">Bookmark</div>
				</motion.div>
			</div>
			<div className="grid grid-cols-1 content-start max-md:mb-16 gap-8">
				<div className="grid text-center items-center gap-2">
					{bookmarks.map((bookmark, index) => (
						<div key={index} className="btn-0" onClick={() => handleSmoothScroll(bookmark)}>
							{manifest?.DestinyRecordDefinition[bookmark].displayProperties.name}
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
