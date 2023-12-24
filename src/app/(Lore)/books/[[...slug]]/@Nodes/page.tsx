"use client";

import useNodes from "@/src/hooks/books/useLoreNodes";
import { useLore } from "@/src/providers/LoreProvider";
import { getFirstChildOfNode, getFirstRecord } from "@/src/utils/GetFirst";
import clsx from "clsx";
import Image from "next/image";

export default function NodesPage() {
	const { node, setNode, setBook, setRecord } = useLore();
	const nodes = useNodes();

	function handleOnClick(hash: number) {
		setNode(hash);
		const updatedBook = getFirstChildOfNode(hash);
		const updatedRecord = getFirstRecord(updatedBook);
		setBook(updatedBook);
		setRecord(updatedRecord);
		window.history.pushState({}, "", `/books/${hash}`);
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
