"use client";

import { useLore } from "@/src/providers/LoreProvider";
import { getPresentationNodeDef } from "@d2api/manifest-web";

export default function TitlePage() {
	const { node } = useLore();

	return <div className="header">{getPresentationNodeDef(node)?.displayProperties.name}</div>;
}
