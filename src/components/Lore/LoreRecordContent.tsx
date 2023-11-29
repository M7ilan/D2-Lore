import { useLore } from "@/src/providers/LoreProvider";
import { useManifest } from "@/src/providers/ManifestProvider";
import { motion } from "framer-motion";

export default function LoreRecordContent() {
	const { manifest } = useManifest();
	const { record } = useLore();

	const recordDiff = manifest?.DestinyRecordDefinition[record];
	const loreHash = recordDiff?.loreHash;
	const lore = loreHash && manifest?.DestinyLoreDefinition[loreHash];
	const title = lore && lore?.displayProperties.name;
	const description = lore && lore?.displayProperties.description;

	if (!recordDiff) return null;
	return (
		<div className="grid grid-rows-[min-content_1fr] lg:pl-8 lg:border-l border-default border-opacity-10 gap-8">
			<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }} className="duration-0">
				<div className="center py-6 border-y border-default border-opacity-20 title text-default !text-opacity-80">{title}</div>
			</motion.div>
			<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.3 }} className="duration-0">
				<div className="whitespace-pre-line text-default !text-opacity-80">{description}</div>
			</motion.div>
		</div>
	);
}
