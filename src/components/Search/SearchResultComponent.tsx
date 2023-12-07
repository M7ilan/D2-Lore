import useImageLoad from "@/src/hooks/onImageLoad";
import { useManifest } from "@/src/providers/ManifestProvider";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { HiReply } from "react-icons/hi";
import { motion } from "framer-motion";

export default function SearchResultComponent({ result }: { result: SearchResult }) {
	const { manifest } = useManifest();
	const { isImageLoaded, handleImageLoad } = useImageLoad();
	const { node, book, record } = result;
	const bookTitle = book && manifest?.DestinyPresentationNodeDefinition[book]?.displayProperties.name;
	const bookImage = book && manifest?.DestinyPresentationNodeDefinition[book]?.displayProperties.iconSequences[1]?.frames[0];
	const recordTitle = record && manifest?.DestinyRecordDefinition[record]?.displayProperties.name;
	const loreHash = record && manifest?.DestinyRecordDefinition[record]?.loreHash;
	const lore = loreHash && manifest?.DestinyLoreDefinition[loreHash]?.displayProperties.description;

	return (
		<div className="grid grid-rows-[min-content_1fr] lg:grid-cols-[minmax(120px,328px)_minmax(320px,1fr)] gap-8 py-16">
			<div className="grid gap-8 grid-rows-[min-content_1fr] lg:border-r border-default lg:pr-8">
				<div className="center py-6 border-y border-default title scroll-mt-8">{bookTitle}</div>
				<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }} className="duration-0 relative">
					<Image quality={100} priority src={`https://www.bungie.net${bookImage}`} className={clsx("hidden lg:block shadow-lg", { "opacity-100": isImageLoaded[book], "opacity-0": !isImageLoaded[book] })} width={1436} height={1840} alt="Book" onLoad={() => handleImageLoad(book)} />
				</motion.div>
			</div>
			{(recordTitle || lore) && (
				<div className="grid gap-8 grid-rows-[min-content_1fr]">
					<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }} className="duration-0">
						<div className="flex justify-between items-center py-6 border-y border-default border-opacity-20 title text-default !text-opacity-80">
							<div className="flex">
								<div className="w-8 h-8"></div>
							</div>
							<div>{recordTitle}</div>
							<div className="center cursor-pointer bg-default-0-hover p-1 rounded-md">
								<Link href={`/books/${node}/${book}/${record}`}>
									<HiReply />
								</Link>
							</div>
						</div>
					</motion.div>
					<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.3 }} className="duration-0">
						<div className="grid grid-rows-[1fr_min-content] grid-cols-1 gap-16 h-full justify-between whitespace-pre-line text-default !text-opacity-80">
							<div className="grid grid-cols-1 justify-between whitespace-pre-line text-default !text-opacity-80">{lore}</div>
						</div>
					</motion.div>
				</div>
			)}
		</div>
	);
}
