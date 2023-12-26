"use client";

import { getFirstNode } from "@/src/utils/GetFirst";
import { getPresentationNodeDef } from "@d2api/manifest-web";
import { motion } from "framer-motion";
import { memo } from "react";

type TitleProps = {
	params: {
		slug: string[];
	};
};

function Title({ params }: TitleProps) {
	console.log("Title rendered");

	const nodeSlug = Number(params?.slug?.[0]) || 0;
	const node = nodeSlug || getFirstNode(4077680549);
	const name = getPresentationNodeDef(node)?.displayProperties.name;

	return (
		<motion.div initial={{ x: -10 }} animate={{ x: 0 }} className="header">
			{name}
		</motion.div>
	);
}

export default memo(Title, (prevProps, nextProps) => {
	console.log("Title memo");

	return prevProps.params.slug[0] === nextProps.params.slug[0];
});
