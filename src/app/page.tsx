import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
	return (
		<div className="homepage-container center flex-col gap-4 h-[50vh] px-16">
			<Image quality={100} priority src="/Lore Logo.png" className="w-32 h-32 invert opacity-80 dark:opacity-100 dark:invert-0" width={800} height={800} alt="Logo" />
			<div className="header">Discover the Legends!</div>
			<div className="title">Welcome to D2 Lore</div>
			<div>Dive into the intricate and fascinating lore of Destiny. Explore stories, legends, and mysteries of the universe like never before.</div>
			<Link href="/books" className="btn-0">Start Exploring</Link>
		</div>
	);
}
