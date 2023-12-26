"use client";

import useLoreNodes from "@/src/hooks/books/useLoreNodes";
import { getFirstNode } from "@/src/utils/GetFirst";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export default function Nodes({ params }: { params: { slug: string[] } }) {
	const nodeSlug = Number(params?.slug?.[0]) || 0;
	const node = nodeSlug || getFirstNode(4077680549);
	const nodes = useLoreNodes();

	return (
		<div className="grid grid-flow-col gap-2">
			{nodes?.map((nodeDiff) => {
				const nodeHash = nodeDiff?.hash || 0;
				const name = nodeDiff?.displayProperties.name || "node";
				const icon = `https://www.bungie.net${nodeDiff?.displayProperties.icon}`;

				return (
					<Link href={`/books/${nodeHash}`} key={nodeHash} className={clsx("node p-2 invert dark:invert-0", { active: node == nodeHash })}>
						<Image src={icon} width={84} height={84} alt={name} className="w-[60px] " />
					</Link>
				);
			})}
		</div>
	);
}
