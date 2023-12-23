"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import useLoreBook from "@/src/hooks/books/useLoreBook";
import { useLore } from "@/src/providers/LoreProvider";
import clsx from "clsx";
import { motion } from "framer-motion";
import { HiBookmark, HiCheck, HiShare } from "react-icons/hi";
import { RootState } from "@/src/redux/store";
import useBookmarksUpdate from "@/src/hooks/books/useBookmarksUpdate";
import useReadsUpdate from "@/src/hooks/books/useReadsUpdate";

export default function RecordPage() {
	const loreContent = useLoreBook();
	const { node, book, record } = useLore();
	const bookmarks = useSelector((state: RootState) => state.bookmarks.bookmarks);
	const updateBookmarks = useBookmarksUpdate();
	const updateReads = useReadsUpdate();
	const bookmarked = bookmarks.find((bookmark) => bookmark.record === record);
	const reads = useSelector((state: RootState) => state.reads.reads);
	const read = reads.find((read) => read.record === record);
	const [copied, setCopied] = useState(false);

	function copyLink() {
		navigator.clipboard.writeText(window.location.origin + `/books/${node}/${book}/${record}`);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}

	return (
		<div key={record} className="grid grid-rows-[min-content_1fr] gap-8 lg:border-l-2 lg:pl-8">
			<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }} className="border-y-2 flex items-center title py-5 justify-between">
				<div className="flex gap-2">
					<div className="h-6 w-6"></div>
					<div className="h-6 w-6"></div>
				</div>
				{loreContent?.displayProperties.name}
				<div className="flex gap-2">
					<HiBookmark onClick={() => updateBookmarks(node, book, record)} className={clsx("w-6 h-6 cursor-pointer animate", { "opacity-100": bookmarked, "opacity-25": !bookmarked })} />
					{copied ? <HiCheck className="w-6 h-6 animate" /> : <HiShare onClick={copyLink} className="w-6 h-6 cursor-pointer" />}
				</div>
			</motion.div>
			<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.3 }} className="dark:text-default-60 whitespace-pre-line">
				{loreContent?.displayProperties.description}
			</motion.div>
			<button onClick={() => updateReads(node, book, record)} className="secondary-button">
				{read ? "Mark as unread" : "Mark as read"}
			</button>
		</div>
	);
}
