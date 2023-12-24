"use client";

import { useArmor } from "@/src/providers/ArmorProvider";
import { getPresentationNodeDef } from "@d2api/manifest-web";

export default function ClassPage() {
	const { node } = useArmor();

	return <div className="header">{getPresentationNodeDef(node)?.displayProperties.name}</div>;
}
