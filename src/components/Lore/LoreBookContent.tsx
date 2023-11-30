import Image from "next/image";
import clsx from "clsx";
import { useManifest } from "@/src/providers/ManifestProvider";
import { motion } from "framer-motion";
import { useLore } from "@/src/providers/LoreProvider";
import useImageLoad from "@/src/hooks/onImageLoad";

export default function LoreBookContent() {
	const { manifest } = useManifest();
	const { node, book, record, setRecord } = useLore();
	const bookDiff = manifest?.DestinyPresentationNodeDefinition[book];
	const { isImageLoaded, handleImageLoad } = useImageLoad();

	if (!bookDiff) return null;
	return (
		<div className="grid gap-8 content-start">
			<div id={`lore-book-title-[${book}]`} className="center py-6 border-y border-default title scroll-mt-8">
				{bookDiff.displayProperties.name}
			</div>
			<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }} className="duration-0">
				<Image quality={100} priority src={`https://www.bungie.net${bookDiff.displayProperties.iconSequences[1].frames[0]}`} className={isImageLoaded[book] ? "hidden lg:block shadow-lg opacity-100" : "hidden lg:block shadow-lg opacity-0"} width={1436} height={1840} alt="Book" onLoad={() => handleImageLoad(book)} />
			</motion.div>
			<div className="grid grid-cols-[repeat(auto-fill,40px)] w-full justify-start gap-2">
				{bookDiff.children.records.map((recordId, index) => {
					const isActive = recordId.recordHash == record;

					const handleOnClick = () => {
						setRecord(recordId.recordHash);
						window.history.replaceState({}, "", `/books/${node}/${book}/${recordId.recordHash}`);
					};

					return (
						<motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.3 }} className="duration-0">
							<div className={clsx("record", { "active-record": isActive })} onClick={handleOnClick}>
								{index + 1}
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
