import Image from "next/image";

export default function Logo({ classname }: { classname?: string }) {
	return (
		<a href="/" className={`flex items-center gap-4 text-4xl font-bold cursor-pointer ${classname}`}>
			<Image quality={100} priority src="/Lore Logo.png" className="w-12 h-12 invert opacity-80 dark:invert-0" width={800} height={800} alt="Logo" />
			<div>D2 Lore</div>
		</a>
	);
}
