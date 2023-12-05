import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
	return (
		<div className="center text-center flex-col gap-6 px-16">
			<div className="flex-col center">
				<Image quality={100} priority src="/Lore Logo.png" className="w-16 md:w-32 h-16 md:h-32 invert opacity-80 dark:opacity-100 dark:invert-0" width={800} height={800} alt="Logo" />
				<div className="header">Discover the Legends!</div>
			</div>
			<div className="flex-col center">
				<div className="title">Welcome to D2 Lore</div>
				<div className="text-1">Dive into the intricate and fascinating lore of Destiny. Explore stories, legends, and mysteries of the universe like never before.</div>
			</div>
			<Link href="/books" className="btn-0">
				Start Exploring
			</Link>
		</div>
	);
}
