"use client";

import useArmorNodes from "@/src/hooks/armors/useArmorNodes";
import { useArmor } from "@/src/providers/ArmorProvider";
import { getFirstChildOfNode } from "@/src/utils/GetFirst";
import clsx from "clsx";
import Image from "next/image";

export default function NodesPage() {
	const { node, setNode, setCategory } = useArmor();
	const nodes = useArmorNodes();

	function handleOnClick(hash: number) {
		setNode(hash);
		const updatedCategory = getFirstChildOfNode(hash);
		setCategory(updatedCategory);
		window.history.pushState({}, "", `/armors/${hash}`);
	}

	return (
		<div className="grid grid-flow-col gap-2">
			{nodes?.map((nodeDiff) => {
				const nodeHash = nodeDiff?.hash || 0;
				return (
					<div onClick={() => handleOnClick(nodeHash)} key={nodeHash} className={clsx("node p-2 invert dark:invert-0", { active: node == nodeHash })}>
						<Image src={`https://www.bungie.net${nodeDiff?.displayProperties.icon}`} width={84} height={84} alt={nodeDiff?.displayProperties.name || "node"} className="w-[60px] " />
					</div>
				);
			})}
		</div>
	);
}
