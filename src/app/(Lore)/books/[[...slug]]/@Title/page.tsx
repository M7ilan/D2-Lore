"use client";

import { useLore } from "@/src/providers/LoreProvider";
import { getPresentationNodeDef } from "@d2api/manifest-web";
import { motion } from "framer-motion";

export default function Title() {
	const { node } = useLore();
	const name = getPresentationNodeDef(node)?.displayProperties.name;

	return (
		<motion.div key={node} initial={{ x: -10 }} animate={{ x: 0 }} className="title">
			{name}
		</motion.div>
	);
}
