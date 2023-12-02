import Image from "next/image";
import clsx from "clsx";
import { useManifest } from "@/src/providers/ManifestProvider";
import { motion } from "framer-motion";
import { useLore } from "@/src/providers/LoreProvider";
import useImageLoad from "@/src/hooks/onImageLoad";
import { useEffect, useState } from "react";
import { NBR } from "@/src/types/NBR";

export default function LoreBookContent() {
	const { manifest } = useManifest();
	const { node, book, record, setRecord } = useLore();
	const bookDiff = manifest?.DestinyPresentationNodeDefinition[book];
	const { isImageLoaded, handleImageLoad } = useImageLoad();
	const [bookmarks, setBookmarks] = useState<NBR[]>([]);
	const [reads, setReads] = useState<NBR[]>([]);
	const [currentBookRecords, setCurrentBookRecords] = useState<number>(0);
	const [currentBookReads, setCurrentBookReads] = useState<number>(0);

	useEffect(() => {
		setCurrentBookRecords(bookDiff?.children.records.length || 0);
		const readsValues = reads.filter((read) => read.book == book);
		setCurrentBookReads(readsValues.length);

		const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}");
		const values: NBR[] = Object.values(savedBookmarks);
		setBookmarks(values);

		const handleLocalStorageChange = (event: any) => {
			if (event.detail && event.detail.bookmarks) {
				const values: NBR[] = Object.values(event.detail.bookmarks);
				setBookmarks(values);
			}
		};

		window.addEventListener("localStorageChange", handleLocalStorageChange);

		const handleLocalStorageChangeRead = (event: any) => {
			if (event.detail && event.detail.read) {
				const values: NBR[] = Object.values(event.detail.read);
				setReads(values);
			}
		};

		window.addEventListener("localStorageChange", handleLocalStorageChangeRead);

		return () => {
			window.removeEventListener("localStorageChange", handleLocalStorageChange);
			window.removeEventListener("localStorageChange", handleLocalStorageChangeRead);
		};
	}, [reads]);

	useEffect(() => {
		const savedRead = JSON.parse(localStorage.getItem("read") || "{}");
		const readValues: NBR[] = Object.values(savedRead);
		setReads(readValues);
	}, []);

	if (!bookDiff) return null;
	return (
		<div className="grid gap-8 content-start">
			<div id={`lore-book-title-[${book}]`} className="center py-6 border-y border-default title scroll-mt-8">
				{bookDiff.displayProperties.name}
			</div>
			<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }} className="duration-0 relative">
				<Image quality={100} priority src={`https://www.bungie.net${bookDiff.displayProperties.iconSequences[1].frames[0]}`} className={isImageLoaded[book] ? "hidden lg:block shadow-lg opacity-100" : "hidden lg:block shadow-lg opacity-0"} width={1436} height={1840} alt="Book" onLoad={() => handleImageLoad(book)} />
				<div className="absolute top-0 w-full backdrop-grayscale" style={{ height: `${100 - (currentBookReads / currentBookRecords) * 100}%` }}></div>
			</motion.div>
			<div className="grid grid-cols-[repeat(auto-fill,40px)] w-full justify-start gap-2">
				{bookDiff.children.records.map((recordId, index) => {
					const isActive = recordId.recordHash == record;
					const isBookmarked = bookmarks.some((bookmark) => bookmark.record == recordId.recordHash);
					const isRead = reads.some((read) => read.record == recordId.recordHash);

					const handleOnClick = () => {
						setRecord(recordId.recordHash);
						window.history.replaceState({}, "", `/books/${node}/${book}/${recordId.recordHash}`);
					};

					return (
						<motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.3 }} className="duration-0">
							<div className={clsx("record relative overflow-hidden", { "active-record": isActive, "read-record": isRead })} onClick={handleOnClick}>
								{index + 1}
								{isBookmarked && (
									<motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.3 }} className="duration-0">
										<div className="absolute right-0 top-0 opacity-90">
											<svg className="w-2 h-8" xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 100 400" width="100" height="400">
												<defs>
													<image width="100" height="400" id="img1" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAGQAQMAAABiWFesAAAAAXNSR0IB2cksfwAAAAZQTFRF8D4+AAAAvhApowAAAAJ0Uk5T/wDltzBKAAAAtUlEQVR4nO3PsQ2EMBBEUSwHDimBUtzKdWJKoxRKICQ4scfa7HqsEx3MZC/6mmniOI7jOI7jOI7jOI7jOO5vn3eFAxW/qDRoFtQi66uK7CBBBZETcoOSyIU51CIC+XyrB8utDXIQDCp/GFUeTCp/OKs8sVRZIg8qVRassGBoOiDnidR0Yc7UcpbPjzbImR60RBgUTSfknvxsEsw1ZdcKuRZ0aCIMil0n5Gqw5/Rhz2kiDyqg/QcgfSzb0MwXfgAAAABJRU5ErkJggg==" />
												</defs>
												<style />
												<use href="#img1" x="0" y="0" />
											</svg>
										</div>
									</motion.div>
								)}
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
