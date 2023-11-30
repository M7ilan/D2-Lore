"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
	const path = usePathname();
	const isActive = (pathname: string) => path.startsWith(pathname);

	return (
		<div className="relative border-b border-default">
			<div className="grid grid-cols-1 gap-4 w-20 sticky top-10">
				<Link href={"/books"} className={clsx("node h-20", { "active-node": isActive("/books") })}>
					<Image alt="Lore Book" src="/Lore Logo.png" width={344} height={344} />
				</Link>
				<Link href={"/armor"} className={clsx("node h-20", { "active-node": isActive("/armor") })}>
					<Image alt="Lore Book" src="/Armors.png" width={80} height={80} />
				</Link>
			</div>
		</div>
	);
}
