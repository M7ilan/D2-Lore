"use client";

import { useArmor } from "@/src/providers/ArmorProvider";
import { getPresentationNodeDef } from "@d2api/manifest-web";
import { motion } from "framer-motion";

export default function ClassPage() {
	const { node } = useArmor();

	return (
		<motion.div key={node} initial={{ x: -10 }} animate={{ x: 0 }} className="title">
			{getPresentationNodeDef(node)?.displayProperties.name}
		</motion.div>
	);
}
