"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
	const path = usePathname();
	const isActive = (pathname: string) => path.startsWith(pathname);

	return (
		<div className="relative md:border-b border-default">
			<div className="grid max-md:grid-cols-3 w-full gap-4 md:w-16 md:sticky md:top-10">
				<Link href={"/books"} className={clsx("node h-16", { "active-node": isActive("/books") })}>
					<Image className="max-w-12 max-h-12 object-contain invert dark:invert-0" alt="Lore Books" src="/Lore Logo.png" width={80} height={80} />
				</Link>
				<Link href={"/armor"} className={clsx("node h-16", { "active-node": isActive("/armor") })}>
					<Image className="max-w-14 max-h-14 object-contain invert dark:invert-0" alt="Armors" src="/Armors.png" width={80} height={80} />
				</Link>
			</div>
		</div>
	);
}
