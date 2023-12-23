import Link from "next/link";
import PingIcon from "@/src/components/PingIcon";
import Logo from "@/src/components/Logo";

export default function Hero() {
	return (
		<div className="relative isolate py-32 mx-2">
			<div className="mx-auto max-w-2xl">
				<div className="hidden sm:mb-8 sm:flex sm:justify-center">
					<Link href="https://beta.d2lore.com" className="flex items-center gap-2 relative rounded-full px-3 py-1 text-sm leading-6 border-button border-default-100">
						Give Beta Version a Try!
						<PingIcon />
					</Link>
				</div>
				<div className="text-center">
					<h1 className="font-bold tracking-tight sm:text-6xl">
						Welcome to <Logo className="sm:text-6xl" />
					</h1>
					<p className="mt-6 leading-8 text-default-60">The Destiny 2 Lore Library.</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Link href="/books" className="primary-button">
							Discover the Legends
						</Link>
						<Link href="#" className="secondary-button">
							Learn more
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
