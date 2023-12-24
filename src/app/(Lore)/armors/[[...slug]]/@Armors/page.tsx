"use client";

import FullItemIcon from "@/src/components/FullItemIcon";
import useCategory from "@/src/hooks/armors/useCategory";
import { getCollectibleDef, getPresentationNodeDef } from "@d2api/manifest-web";
import Link from "next/link";

export default function ArmorsPage() {
	const categoryContent = useCategory();
	const categoryChildren = categoryContent?.children?.presentationNodes;

	return (
		<div className="grid gap-8">
			{categoryChildren?.map((child) => {
				const suit = getPresentationNodeDef(child?.presentationNodeHash);
				const suitName = suit?.displayProperties.name;
				const childHash = suit?.hash || 0;
				const suitChildren = suit?.children.collectibles;

				return (
					<div key={childHash} className="flex gap-2 items-center text-center border-2">
						{suitChildren?.map((child) => {
							const childHash = child?.collectibleHash || 0;
							const armor = getCollectibleDef(childHash);
							const itemHash = armor?.itemHash || 0;
							const bungieURL = "https://www.bungie.net";
							const icon = bungieURL + armor?.displayProperties.icon;

							return (
								<Link href={`/inspect/${itemHash}`} key={childHash} className="node">
									<FullItemIcon iconSrc={icon} id={itemHash} />
								</Link>
							);
						})}
						<div className="title text-end pr-4 flex-1">{suitName}</div>
					</div>
				);
			})}
		</div>
	);
}
