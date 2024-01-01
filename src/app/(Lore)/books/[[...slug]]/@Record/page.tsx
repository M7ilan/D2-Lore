"use client";

import { useSelector } from "react-redux";
import useLoreBook from "@/src/hooks/books/useLoreBook";
import clsx from "clsx";
import { motion } from "framer-motion";
import { HiBookmark, } from "react-icons/hi";
import { RootState } from "@/src/redux/store";
import useBookmarksUpdate from "@/src/hooks/books/useBookmarksUpdate";
import useReadsUpdate from "@/src/hooks/books/useReadsUpdate";
import { useLore } from "@/src/providers/LoreProvider";

export default function Record() {
	const { node, book, record } = useLore();

	const loreContent = useLoreBook(record);
	const bookmarks = useSelector((state: RootState) => state.bookmarks.bookmarks);
	const updateBookmarks = useBookmarksUpdate();
	const updateReads = useReadsUpdate();
	const bookmarked = bookmarks.find((bookmark) => bookmark.record === record);
	const reads = useSelector((state: RootState) => state.reads.reads);
	const read = reads.find((read) => read.record === record);

	return (
		<div id={`Record`} key={record} className="grid grid-rows-[min-content_1fr] gap-8 lg:border-l-2 lg:pl-8 scroll-m-4">
			<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }} className="border-y-2 flex items-center subtitle py-5 justify-between">
				<div className="flex gap-2">
					<div className="h-6 w-6"></div>
				</div>
				{loreContent?.displayProperties.name}
				<div className="flex gap-2">
					<HiBookmark onClick={() => updateBookmarks(node, book, record)} className={clsx("w-6 h-6 cursor-pointer animate", { "opacity-100": bookmarked, "opacity-25": !bookmarked })} />
				</div>
			</motion.div>
			<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.3 }} className="dark:text-default-60 whitespace-pre-line">
				{loreContent?.displayProperties.description}
			</motion.div>
			<motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.3 }} onClick={() => updateReads(node, book, record)} className="secondary-button">
				{read ? "Mark as unread" : "Mark as read"}
			</motion.button>
		</div>
	);
}
