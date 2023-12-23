"use client";

import { useArmor } from "@/src/providers/ArmorProvider";
import { useManifest } from "@/src/providers/ManifestProvider";

export default function ClassPage() {
	const { manifest } = useManifest();
	const { node } = useArmor();

	return <div className="header">{manifest?.DestinyPresentationNodeDefinition[node]?.displayProperties.name}</div>;
}
