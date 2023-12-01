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

	const handleShareClick = () => {
		const currentUrl = `${window.location.origin}/books/${node}/${book}/${record}`;
		navigator.clipboard.writeText(currentUrl);
		setIsLinkCopied(true);

		setTimeout(() => {
			setIsLinkCopied(false);
		}, 2000);
	};

	useEffect(() => {
		const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}");
		setBookmarked(savedBookmarks[record] || false);
	}, [record]);

	const updateLocalStorage = () => {
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
	};

	const handleBookmarkClick = () => {
		setBookmarked((prev) => !prev);
		updateLocalStorage();
	};

	if (!recordDiff) return null;
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
				<div className="whitespace-pre-line text-default !text-opacity-80">{description}</div>
			</motion.div>
		</div>
	);
}
