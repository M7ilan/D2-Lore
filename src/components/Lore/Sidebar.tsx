"use client";

import clsx from "clsx";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { helmetSVG, bookSVG } from "@/src/icons";
import Link from "next/link";
import { HiSearch } from "react-icons/hi";

export default function Sidebar() {
	const path = usePathname();
	const firstPath = path.split("/")[1];

	const tabs = [
		{
			name: "Books",
			path: "books",
			icon: bookSVG,
		},
		{
			name: "Armors",
			path: "armors",
			icon: helmetSVG,
		},
	];

	return (
		<div className="relative">
			<div className="sticky top-10 grid max-md:grid-cols-3 gap-1">
				{tabs.map((tab, index) => (
					<Link key={tab.name} href={`/${tab.path}`} className={clsx("node md:w-[60px] h-[60px] p-3", { active: firstPath === tab.path })}>
						<Image src={tab.icon} width={344} height={344} alt={tab.name} className="dark:invert invert-0 w-full h-full" />
					</Link>
				))}
				<Link href="/search" className={clsx("node md:w-[60px] h-[60px] p-3", { active: firstPath === "search" })}>
					<HiSearch className="text-black dark:text-white w-full h-full" />
				</Link>
			</div>
		</div>
	);
}
