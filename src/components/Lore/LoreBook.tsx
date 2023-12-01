import Image from "next/image";
import clsx from "clsx";
import { useManifest } from "@/src/providers/ManifestProvider";
import { motion } from "framer-motion";
import { useLore } from "@/src/providers/LoreProvider";
import useIsSmallScreen from "@/src/hooks/useIsSmallScreen";
import useImageLoad from "@/src/hooks/onImageLoad";
import { useEffect, useState } from "react";
import { Bookmark } from "@/src/types/Bookmark";

export default function LoreBook() {
	const { manifest } = useManifest();
	const { node, book, setBook } = useLore();
	const isSmallScreen = useIsSmallScreen();
	const { isImageLoaded, handleImageLoad } = useImageLoad();
	const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
	const books = manifest?.DestinyPresentationNodeDefinition[node]?.children.presentationNodes;

	const handleSmoothScroll = (bookHash: number) => {
		setBook(bookHash);

		if (isSmallScreen) {
			setTimeout(() => {
				document.getElementById(`lore-book-title-[${bookHash}]`)?.scrollIntoView({ behavior: "smooth" });
			});
		}
	};

	useEffect(() => {
		const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}");
		const values: Bookmark[] = Object.values(savedBookmarks);
		setBookmarks(values);

		const handleLocalStorageChange = (event: any) => {
			if (event.detail && event.detail.bookmarks) {
				const values: Bookmark[] = Object.values(event.detail.bookmarks);
				setBookmarks(values);
			}
		};

		window.addEventListener("localStorageChange", handleLocalStorageChange);

		return () => {
			window.removeEventListener("localStorageChange", handleLocalStorageChange);
		};
	}, []);

	return (
		<>
			{books?.map((bookId, index) => {
				const isActive = bookId.presentationNodeHash == book;
				const bookDefinition = manifest?.DestinyPresentationNodeDefinition[bookId.presentationNodeHash];
				const isBookmarked = bookmarks.some((bookmark) => bookmark.book == bookId.presentationNodeHash);

				const handleOnClick = () => {
					setBook(bookId.presentationNodeHash);
					window.history.replaceState({}, "", `/books/${node}/${bookId.presentationNodeHash}`);
				};

				return (
					<motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.3 }} className="duration-0 relative">
						<div
							className="book"
							onClick={() => {
								handleSmoothScroll(bookId.presentationNodeHash);
								handleOnClick();
							}}
						>
							{isBookmarked && (
								<motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.3 }} className="duration-0">
									<div className="absolute right-2 opacity-90">
										<svg className="w-3 h-12" xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 100 400" width="100" height="400">
											<defs>
												<image width="100" height="400" id="img1" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAGQAQMAAABiWFesAAAAAXNSR0IB2cksfwAAAAZQTFRF8D4+AAAAvhApowAAAAJ0Uk5T/wDltzBKAAAAtUlEQVR4nO3PsQ2EMBBEUSwHDimBUtzKdWJKoxRKICQ4scfa7HqsEx3MZC/6mmniOI7jOI7jOI7jOI7jOO5vn3eFAxW/qDRoFtQi66uK7CBBBZETcoOSyIU51CIC+XyrB8utDXIQDCp/GFUeTCp/OKs8sVRZIg8qVRassGBoOiDnidR0Yc7UcpbPjzbImR60RBgUTSfknvxsEsw1ZdcKuRZ0aCIMil0n5Gqw5/Rhz2kiDyqg/QcgfSzb0MwXfgAAAABJRU5ErkJggg==" />
											</defs>
											<style />
											<use href="#img1" x="0" y="0" />
										</svg>
									</div>
								</motion.div>
							)}
							<Image quality={100} onLoad={() => handleImageLoad(bookId.presentationNodeHash)} className={isImageLoaded[bookId.presentationNodeHash] ? "opacity-100" : "opacity-0"} priority src={`https://www.bungie.net${bookDefinition?.displayProperties.iconSequences[1].frames[0]}`} width={1436} height={1840} alt="Book" />
						</div>
						<div className={clsx("active-book opacity-0", { "active-book opacity-100": isActive })}></div>
					</motion.div>
				);
			})}
		</>
	);
}
