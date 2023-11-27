import Image from "next/image";
import clsx from "clsx";
import { useManifest } from "@/src/providers/ManifestProvider";
import { useLore } from "@/src/providers/LoreProvider";

export default function LoreNode() {
	const { manifest } = useManifest();
	const { node, setNode } = useLore();
	const nodes = manifest?.DestinyPresentationNodeDefinition[4077680549]?.children.presentationNodes;

	return (
		<>
			{nodes?.map((nodeId, index) => {
				const isActive = nodeId.presentationNodeHash === node;
				const nodeDefinition = manifest?.DestinyPresentationNodeDefinition[nodeId.presentationNodeHash];
				return (
					<div key={index} className={clsx("node", { "active-node": isActive })} onClick={() => setNode(nodeId.presentationNodeHash)}>
						<Image priority src={`https://www.bungie.net${nodeDefinition?.displayProperties.icon}`} className="w-12 h-12 object-contain invert dark:invert-0" width={336} height={336} alt="Node" />
					</div>
				);
			})}
		</>
	);
}
