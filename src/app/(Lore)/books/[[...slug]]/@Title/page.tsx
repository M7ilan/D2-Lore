"use client";

import { useLore } from "@/src/providers/LoreProvider";
import { useManifest } from "@/src/providers/ManifestProvider";

export default function TitlePage() {
	const { manifest } = useManifest();
	const { node } = useLore();

	return <div className="header">{manifest?.DestinyPresentationNodeDefinition[node]?.displayProperties.name}</div>;
}
