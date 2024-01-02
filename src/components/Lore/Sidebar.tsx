"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Book from "@/src/icons/Book";
import Helmet from "@/src/icons/Helmet";
import Search from "@/src/icons/Search";

export default function Sidebar() {
	const path = usePathname();
	const firstPath = path.split("/")[1];

	const tabs = [
		{
			name: "Books",
			path: "books",
			icon: <Book className="w-12 h-12 p-1" />,
		},
		{
			name: "Armors",
			path: "armors",
			icon: <Helmet className="w-12 h-12 p-1" />,
		},
	];

	return (
		<div className="relative">
			<div className="sticky top-10 grid max-md:grid-cols-3 gap-2">
				{tabs.map((tab) => (
					<Link key={tab.name} href={`/${tab.path}`} className={clsx("node", { active: firstPath === tab.path })}>
						{tab.icon}
					</Link>
				))}
				<Link href="/search" className={clsx("node", { active: firstPath === "search" })}>
					<Search className="w-12 h-12 p-1" />
				</Link>
			</div>
		</div>
	);
}
