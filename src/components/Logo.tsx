import Image from "next/image";
import Link from "next/link";

export default function Logo({ classname }: { classname?: string }) {
	return (
		<Link href="/" className={`flex items-center gap-4 text-4xl font-bold cursor-pointer ${classname}`}>
			<Image priority src="/Lore Logo.png" className="w-12 h-12 invert dark:invert-0" width={800} height={800} alt="Logo" />
			<div>D2 Lore</div>
		</Link>
	);
}
