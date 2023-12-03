import { useEffect, useState } from "react";
import { useLore } from "@/src/providers/LoreProvider";
import { useManifest } from "@/src/providers/ManifestProvider";
import { motion } from "framer-motion";
import { HiCheck, HiShare, HiOutlineBookmark, HiBookmark } from "react-icons/hi";

export default function LoreRecordContent() {
	const { manifest } = useManifest();
	const { node, book, record } = useLore();

	const recordDiff = manifest?.DestinyRecordDefinition[record];
	const loreHash = recordDiff?.loreHash;
	const lore = loreHash && manifest?.DestinyLoreDefinition[loreHash];
	const title = lore && lore?.displayProperties.name;
	const description = lore && lore?.displayProperties.description;

	const [isLinkCopied, setIsLinkCopied] = useState(false);
	const [bookmarked, setBookmarked] = useState(false);
	const [isRead, setIsRead] = useState(false);

	useEffect(() => {
		const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}");
		setBookmarked(savedBookmarks[record] || false);

		const savedRead = JSON.parse(localStorage.getItem("read") || "{}");
		setIsRead(!!savedRead[record]);
	}, [record]);

	function handleShareClick() {
		const currentUrl = `${window.location.origin}/books/${node}/${book}/${record}`;
		navigator.clipboard.writeText(currentUrl);
		setIsLinkCopied(true);

		setTimeout(() => {
			setIsLinkCopied(false);
		}, 2000);
	}

	function updateLocalStorage() {
		let savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}");
		if (savedBookmarks[record]) {
			delete savedBookmarks[record];
		} else {
			savedBookmarks[record] = { node, book, record };
		}
		localStorage.setItem("bookmarks", JSON.stringify(savedBookmarks));

		window.dispatchEvent(
			new CustomEvent("localStorageChange", {
				detail: { bookmarks: savedBookmarks },
			}),
		);
	}

	function handleBookmarkClick() {
		setBookmarked((prev) => !prev);
		updateLocalStorage();
	}

	function handleReadClick() {
		const savedRead = JSON.parse(localStorage.getItem("read") || "{}");
		if (savedRead[record]) {
			delete savedRead[record];
			setIsRead(false);
		} else {
			savedRead[record] = { node, book, record };
			setIsRead(true);
		}
		localStorage.setItem("read", JSON.stringify(savedRead));

		window.dispatchEvent(
			new CustomEvent("localStorageChange", {
				detail: { read: savedRead },
			}),
		);
	}

	return (
		<div className="grid grid-rows-[min-content_1fr] lg:pl-8 lg:border-l border-default border-opacity-10 gap-8">
			<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }} className="duration-0">
				<div className="flex justify-between items-center py-6 border-y border-default border-opacity-20 title text-default !text-opacity-80">
					<div className="flex">
						<div className="w-8 h-8"></div>
						<div className="w-8 h-8"></div>
					</div>
					<div id={`record-title-[${book}]`} className="scroll-mt-8">
						{title}
					</div>
					<div className="flex">
						<div className="center cursor-pointer bg-default-0-hover p-1 rounded-md" onClick={handleBookmarkClick}>
							{bookmarked ? <HiBookmark /> : <HiOutlineBookmark />}
						</div>
						<div className="center cursor-pointer bg-default-0-hover p-1 rounded-md" onClick={handleShareClick}>
							{isLinkCopied ? <HiCheck /> : <HiShare />}
						</div>
					</div>
				</div>
			</motion.div>
			<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.3 }} className="duration-0">
				<div className="grid grid-rows-[1fr_min-content] grid-cols-1 gap-16 h-full justify-between whitespace-pre-line text-default !text-opacity-80">
					<div>{description}</div>
					<button onClick={handleReadClick}>{isRead ? "Mark as unread" : "Mark as read"}</button>
				</div>
			</motion.div>
		</div>
	);
}
