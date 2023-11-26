// src\components\Bungie\LoreBookContent.tsx

import Image from "next/image";
import clsx from "clsx";
import { useManifest } from "@/src/providers/ManifestProvider";
import { motion } from "framer-motion";
import { useLore } from "@/src/providers/LoreProvider";

export default function LoreBookContent() {
	const { manifest } = useManifest();
	const { book, record, setRecord } = useLore();
	const bookDiff = manifest?.DestinyPresentationNodeDefinition[book];

	if (!bookDiff) return null;
	return (
		<div className="grid gap-8 content-start">
			<div className="center py-6 border-y border-white border-opacity-20 title">{bookDiff.displayProperties.name}</div>
			<Image priority src={`https://www.bungie.net${bookDiff.displayProperties.iconSequences[1].frames[0]}`} className="hidden lg:block shadow-lg" width={1436} height={1840} alt="Book" />
			<div className="grid grid-cols-[repeat(auto-fill,40px)] w-full justify-start gap-2">
				{bookDiff.children.records.map((recordId, index) => {
					const isActive = recordId.recordHash === record;
					return (
						<motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.3 }} className="duration-0">
							<div className={clsx("record", { "active-record": isActive })} onClick={() => setRecord(recordId.recordHash)}>
								{index + 1}
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
