import Image from "next/image";
import clsx from "clsx";
import { useManifest } from "@/src/providers/ManifestProvider";
import { motion } from "framer-motion";
import { useLore } from "@/src/providers/LoreProvider";
import useIsSmallScreen from "@/src/hooks/useIsSmallScreen";
import useImageLoad from "@/src/hooks/onImageLoad";

export default function LoreBook() {
	const { manifest } = useManifest();
	const { node, book, setBook } = useLore();
	const isSmallScreen = useIsSmallScreen();
	const books = manifest?.DestinyPresentationNodeDefinition[node]?.children.presentationNodes;
	const { isImageLoaded, handleImageLoad } = useImageLoad();

	const handleSmoothScroll = (bookHash: number) => {
		setBook(bookHash);

		if (isSmallScreen) {
			setTimeout(() => {
				document.getElementById(`lore-book-title-[${bookHash}]`)?.scrollIntoView({ behavior: "smooth" });
			});
		}
	};

	return (
		<>
			{books?.map((bookId, index) => {
				const isActive = bookId.presentationNodeHash == book;
				const bookDefinition = manifest?.DestinyPresentationNodeDefinition[bookId.presentationNodeHash];

				const handleOnClick = () => {
					setBook(bookId.presentationNodeHash);
					window.history.replaceState({}, "", `/${node}/${bookId.presentationNodeHash}`);
				};

				return (
					<motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.3 }} className="duration-0">
						<div
							className={clsx("book", { "active-book": isActive })}
							onClick={() => {
								handleSmoothScroll(bookId.presentationNodeHash);
								handleOnClick();
							}}
						>
							<Image quality={100} onLoad={() => handleImageLoad(bookId.presentationNodeHash)} className={isImageLoaded[bookId.presentationNodeHash] ? "opacity-100" : "opacity-0"} priority src={`https://www.bungie.net${bookDefinition?.displayProperties.iconSequences[1].frames[0]}`} width={1436} height={1840} alt="Book" />
						</div>
					</motion.div>
				);
			})}
		</>
	);
}
