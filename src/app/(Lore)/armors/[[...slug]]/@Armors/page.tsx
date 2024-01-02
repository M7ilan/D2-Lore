"use client";

import FullItemIcon from "@/src/components/FullItemIcon";
import useCategory from "@/src/hooks/armors/useCategory";
import { getCollectibleDef, getPresentationNodeDef } from "@d2api/manifest-web";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Armors() {
	const categoryContent = useCategory();
	const categoryChildren = categoryContent?.children?.presentationNodes;

	return (
		<div className="grid gap-8">
			{categoryChildren?.map((child, index) => {
				const suit = getPresentationNodeDef(child?.presentationNodeHash);
				const suitName = suit?.displayProperties.name;
				const childHash = suit?.hash || 0;
				const suitChildren = suit?.children.collectibles;

				return (
					<motion.div key={childHash} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1}} className="flex gap-2 items-center text-center border-2">
						{suitChildren?.map((child) => {
							const childHash = child?.collectibleHash || 0;
							const armor = getCollectibleDef(childHash);
							const itemHash = armor?.itemHash || 0;
							const bungieURL = "https://www.bungie.net";
							const icon = bungieURL + armor?.displayProperties.icon;

							return (
								<Link href={`/inspect/${itemHash}`} key={childHash} className="armor">
									<FullItemIcon iconSrc={icon} id={itemHash} />
								</Link>
							);
						})}
						<div className="text-end pr-4 flex-1 subtitle">{suitName}</div>
					</motion.div>
				);
			})}
		</div>
	);
}
