"use client";

import useLoreNodes from "@/src/hooks/books/useLoreNodes";
import { useLore } from "@/src/providers/LoreProvider";
import { getFirstChildOfNode, getFirstRecord } from "@/src/utils/GetFirst";
import clsx from "clsx";
import Image from "next/image";

export default function Nodes() {
	const { node, setNode, setBook, setRecord } = useLore();
	const nodes = useLoreNodes();

	function handleOnClick(nodeHash: number) {
		setNode(nodeHash);
		const book = getFirstChildOfNode(nodeHash);
		setBook(book);
		const record = getFirstRecord(book);
		setRecord(record);
		window.history.pushState({}, "", `/books/${nodeHash}`);
	}

	return (
		<div className="grid grid-flow-col gap-2">
			{nodes?.map((nodeDiff) => {
				const nodeHash = nodeDiff?.hash || 0;
				const name = nodeDiff?.displayProperties.name || "node";
				const icon = `https://www.bungie.net${nodeDiff?.displayProperties.icon}`;

				return (
					<div onClick={() => handleOnClick(nodeHash)} key={nodeHash} className={clsx("node p-2 invert dark:invert-0", { active: node == nodeHash })}>
						<Image src={icon} width={84} height={84} alt={name} className="w-[60px] " />
					</div>
				);
			})}
		</div>
	);
}
